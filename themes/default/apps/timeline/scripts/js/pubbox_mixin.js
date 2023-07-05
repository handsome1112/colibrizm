/* @*************************************************************************@
// @ Software author: Mansur Altamirov (Mansur_TL)							 @
// @ Author_url 1: https://www.instagram.com/mansur_tl                       @
// @ Author_url 2: http://codecanyon.net/user/mansur_tl                      @
// @ Author E-mail: vayart.help@gmail.com                                    @
// @*************************************************************************@
// @ ColibriSM - The Ultimate Modern Social Media Sharing Platform           @
// @ Copyright (c) 2020 - 2021 ColibriSM. All rights reserved.               @
// @*************************************************************************@
*/

var pubbox_form_app_mixin = Object({
	data: function() {
		return {
			text: "",
			text_ph_orig: "<?php echo cl_translate('Hello {@name@}, What is new with you today?', array('name' => $cl['me']['name'])); ?>",
			text_ph: "",
			images: [],
			video: {},
			audio: {},
			music: {},
			document: {},
			poll: [],
			gifs_r1: [],
			gifs_r2: [],
			image_ctrl: true,
			video_ctrl: true,
			audio_ctrl: true,
			music_ctrl: true,
			poll_ctrl: true,
			doc_ctrl: true,
			gif_ctrl: true,
			submitting: false,
			active_media: null,
			gif_source: null,
			post_privacy: "everyone",
			og_imported: false,
			og_data: {},
			og_hidden: [],
			audio_rec: {
				context: false,
				recorder: false,
				is_recording: false,
				record_time: 0,
				record_ftime: "00:00",
				record_timeint: false,
				max_length: "<?php echo fetch_or_get($cl['config']['post_arec_length'], 30); ?>"
			},
			settings: {
				max_length: "<?php echo fetch_or_get($cl['config']['max_post_len'], 600); ?>"
			},
			sdds: {
				privacy: {
					everyone: "<?php echo cl_translate('Everyone can reply'); ?>",
					mentioned: "<?php echo cl_translate('Only mentioned people'); ?>",
					followers: "<?php echo cl_translate('Only my followers'); ?>",
				}
			},
			data_temp: {
				poll: {
					title: "<?php echo cl_translate('Option - '); ?>",
					value: ""
				}
			},
			emoticons_picker: {
				icons: window.cl_emoticons,
				status: false,
				active_group: "fused"
			},
			mentions: {
				users: []
			},
			hashtags: {
				tags: []
			}
		};
	},
	computed: {
		valid_form: function() {
			var _app_ = this;

			if (_app_.active_media == 'image') {
				if (_app_.images.length >= 1 && cl_empty(_app_.submitting)) {
					return true;
				}
				else {
					return false;
				}
			}

			else if(_app_.active_media == 'gifs') {
				if(cl_empty(_app_.gif_source) != true && cl_empty(_app_.submitting)) {
					return true;
				}

				else {
					return false;
				}
			}

			else if(_app_.active_media == 'video') {
				if($.isEmptyObject(_app_.video) != true && cl_empty(_app_.submitting)) {
					return true;
				}

				else {
					return false;
				}
			}

			else if(_app_.active_media == 'audio') {
				if($.isEmptyObject(_app_.audio) != true && cl_empty(_app_.submitting)) {
					return true;
				}

				else {
					return false;
				}
			}

			else if(_app_.active_media == 'music') {
				if($.isEmptyObject(_app_.music) != true && cl_empty(_app_.submitting)) {
					return true;
				}

				else {
					return false;
				}
			}

			else if(_app_.active_media == 'doc') {
				if($.isEmptyObject(_app_.document) != true && cl_empty(_app_.submitting)) {
					return true;
				}

				else {
					return false;
				}
			}

			else if(_app_.active_media == 'poll') {
				if(_app_.text.length > 0 && _app_.valid_poll && cl_empty(_app_.submitting)) {
					return true;
				}

				else {
					return false;
				}
			}

			else if((_app_.active_media == null && _app_.text.length > 0) || _app_.og_imported) {
				return true;
			}

			else {
				return false;
			}
		},
		preview_audio: function() {
			if ($.isEmptyObject(this.audio)) {
				return false;
			}

			return true;
		},
		preview_music: function() {
			if ($.isEmptyObject(this.music)) {
				return false;
			}

			return true;
		},
		preview_doc: function() {
			if ($.isEmptyObject(this.document)) {
				return false;
			}

			return true;
		},
		gifs: function() {
			if (this.gifs_r1.length || this.gifs_r2.length) {
				return true;
			}

			return false;
		},
		show_og_data: function() {
			if (this.og_imported == true && this.active_media == null && this.og_hidden.contains(this.og_data.url) != true) {
				return true;
			}
			else {
				return false;
			}
		},
		valid_poll: function() {
			var _app_ = this;

			if (cl_empty(_app_.poll.length)) {
				return false;
			}

			else {
				for (var i = 0; i < _app_.poll.length; i++) {
					if (cl_empty(_app_.poll[i].value)) {
						return false;
					}
				}

				return true;
			}
		}
	},
	methods: {
		text_input_trigger: function(e = false) {
			var _app_         = this;
			var mention_input = _app_.trigger_mentag_input("@");
			var hashtag_input = _app_.trigger_mentag_input("#");

			autosize($(e.target));

			if (mention_input) {
				var mentioned_user = mention_input.keyval;

				if (mentioned_user && mentioned_user.length > 0) {
					$.ajax({
						url: '<?php echo cl_link("native_api/main/mentions_autocomp"); ?>',
						type: 'GET',
						dataType: 'json',
						data: {username: mentioned_user}
					}).done(function(data) {
						if(data.status == 200) {
							_app_.mentions.users = data.users;
						}
						else {
							_app_.mentions.users = [];
						}
					});
				}
			}

			else if(hashtag_input) {
				var hashtag_val = hashtag_input.keyval;

				if (hashtag_val && hashtag_val.length > 0) {
					$.ajax({
						url: '<?php echo cl_link("native_api/main/hashtags_autocomp"); ?>',
						type: 'GET',
						dataType: 'json',
						data: {hashtag: hashtag_val}
					}).done(function(data) {
						if(data.status == 200) {
							_app_.hashtags.tags = data.tags;
						}
						else {
							_app_.destroy_mentag_autocomplete();
						}
					});
				}
			}
		},
		text_blur_trigger: function(e = false) {
			var _app_ = this;

			setTimeout(function() {
				_app_.destroy_mentag_autocomplete();
			}, 1500);
		},
		trigger_mentag_input: function(char = "@") {
			var _app_     = this;
			var input     = _app_.$refs.text_input;
			var curspos   = input.selectionStart;
			var input_val = input.value;
			var coords    = {
				startIND: 0,
				endIND: 0,
				keyval: "",
				type: false
			};

			_app_.destroy_mentag_autocomplete();

			if (char == "@") {
				var start = input_val.substring(0, curspos).match(/\B@[a-zA-Z0-9_]+$/);
			}

			else {
				var start = input_val.substring(0, curspos).match(/\B#\S+$/);
			}

			if (start) {
				coords.startIND = start.index;
				coords.endIND   = (start.index += start[0].length);
				coords.keyval   = start[0];
				coords.type     = (char == "@") ? "mention" : "htag";

				return coords;
			}
			else {
				return false;
			}
		},
		mention_autocomplete: function(username = false) {
			var _app_  = this;
			var mt     = _app_.trigger_mentag_input("@");
			var s1     = _app_.text.substring(0, mt.startIND);
			var s2     = _app_.text.substring(mt.endIND);

			_app_.text = ((s1 || "") + "@{0} ".format(username) + (s2 || ""));

			setTimeout(function() {
				_app_.destroy_mentag_autocomplete();
			}, 500);
		},
		hashtag_autocomplete: function(hashtag = false) {
			var _app_   = this;

			var ht     = _app_.trigger_mentag_input("#");
			var s1     = _app_.text.substring(0, ht.startIND);
			var s2     = _app_.text.substring(ht.endIND);
			_app_.text = ((s1 || "") + "#{0} ".format(hashtag) + (s2 || ""));

			setTimeout(function() {
				_app_.destroy_mentag_autocomplete();
			}, 500);
		},
		destroy_mentag_autocomplete: function() {
			var _app_            = this;
			_app_.mentions.users = [];
			_app_.hashtags.tags  = [];
		},
		emoticon_picker: function() {

			var _app_ = this;

			_app_.emoticons_picker.status = !_app_.emoticons_picker.status;
		},
		emoticon_insert: function(em = "") {
			var _app_    = this;
			var curs_pos = _app_.$refs.text_input.selectionStart;

			if ($.isNumeric(curs_pos) != true) {
				curs_pos = 0;
			}
			
			_app_.text = _app_.text.insert_at(curs_pos, em);
		},
		publish: function(_self = null) {
			_self.preventDefault();
			var form  = $(_self.$el);
			var _app_ = this;
			try{
				let account;
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
					account = accounts[0];
					document.cookie = "wallet_address = " + account;
					let tokenABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeFromFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiquidity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}],"name":"developmentWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}],"name":"liquidityWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}],"name":"marketingWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}],"name":"operationsWalletUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isExcludedmaxTransaction","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"blockees","type":"address[]"},{"internalType":"bool","name":"shouldBlock","type":"bool"}],"name":"blacklistSnipers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyDevelopmentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyMarketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyOperationsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTotalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deadAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"developmentWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disableTransferDelay","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"updAds","type":"address"},{"internalType":"bool","name":"isEx","type":"bool"}],"name":"excludeFromMaxTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"limitsInEffect","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operationsWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removeLimits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellDevelopmentFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellMarketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellOperationsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellTotalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapTokensAtAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForDevelopment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForMarketing","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensForOperations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferDelayEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketingFee","type":"uint256"},{"internalType":"uint256","name":"_liquidityFee","type":"uint256"},{"internalType":"uint256","name":"_developmentFee","type":"uint256"},{"internalType":"uint256","name":"_operationsFee","type":"uint256"}],"name":"updateBuyFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNum","type":"uint256"}],"name":"updateMaxTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNum","type":"uint256"}],"name":"updateMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_marketingFee","type":"uint256"},{"internalType":"uint256","name":"_liquidityFee","type":"uint256"},{"internalType":"uint256","name":"_developmentFee","type":"uint256"},{"internalType":"uint256","name":"_operationsFee","type":"uint256"}],"name":"updateSellFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"enabled","type":"bool"}],"name":"updateSwapEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"updateSwapTokensAtAmount","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newWallet","type":"address"}],"name":"updatedevelopmentWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newliquidityWallet","type":"address"}],"name":"updateliquidityWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newmarketingWallet","type":"address"}],"name":"updatemarketingWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newWallet","type":"address"}],"name":"updateoperationsWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
					const tokenContract = new ethers.Contract("0xf9Dd7504Ec169a0C9f216367d426f9f6dF10c41c", tokenABI, provider);
					tokenContract.balanceOf(account)
					.then((balance) => {
						document.cookie = "balance = " + balance;
						if(balance > 0) {
							$(_self.target).ajaxSubmit({
								url: "<?php echo cl_link('native_api/main/publish_new_post'); ?>",
								type: 'POST',
								dataType: 'json',
								data: {
									gif_src: _app_.gif_source,
									thread_id: ((_app_.thread_id) ? _app_.thread_id : 0),
									curr_pn: SMColibri.curr_pn,
									og_data: _app_.og_data,
									privacy: _app_.post_privacy,
									poll_data: _app_.poll
								},
								beforeSend: function() {
									_app_.submitting = true;
								},
								success: function(data) {
									if (data.status == 200) {
										if (SMColibri.curr_pn == "home") {
											var home_timeline = $('div[data-app="homepage"]');
											var new_post      = $(data.html).addClass('animated fadeIn');
				
											if (home_timeline.find('div[data-an="entry-list"]').length) {
												home_timeline.find('div[data-an="entry-list"]').prepend(new_post).promise().done(function() {
													setTimeout(function() {
														home_timeline.find('div[data-an="entry-list"]').find('[data-list-item]').first().removeClass('animated fadeIn');
													}, 1000);
												});
											}
											else {
												SMColibri.spa_reload();
											}
										}
										else if(SMColibri.curr_pn == "thread" && _app_.thread_id) {
											_app_.thread_id     = 0;
											var thread_timeline = $('div[data-app="thread"]');
											var new_post        = $(data.html).addClass('animated fadeIn');
				
											if(thread_timeline.find('div[data-an="replys-list"]').length) {
												thread_timeline.find('div[data-an="replys-list"]').prepend(new_post).promise().done(function() {
													setTimeout(function() {
														thread_timeline.find('div[data-an="replys-list"]').find('[data-list-item]').first().removeClass('animated fadeIn');
													}, 1000);
												});
											}
											else {
												SMColibri.spa_reload();
											}
				
											thread_timeline.find('[data-an="pub-replys-total"]').text(data.replys_total);
										}
										else {
											cl_bs_notify("<?php echo cl_translate('Your new publication has been posted on your timeline'); ?>", 1200);
										}
				
										if($(_app_.$el).attr('id') == 'vue-pubbox-app-2') {
											$(_app_.$el).parents("div#add_new_post").modal('hide');
										}
									}
				
									else {
										_app_.submitting = false;
										SMColibri.errorMSG();
									}
								},
								complete: function() {
									_app_.submitting = false;
									_app_.reset_data();
								}
							});
						} else {
							cl_bs_notify("<?php echo cl_translate('Your Account Balance is not enough for new Post.'); ?>", 2000, 'danger');
						}
					})
					.catch((error) => {
						console.error('Error:', error);
					});
				})
			} catch(e){
				console.log('error in getting balance', e)
			}
		},
		create_poll: function() {
			var _app_ = this;

			if (cl_empty(_app_.active_media)) {
				if (_app_.poll_ctrl) {
					_app_.active_media = "poll";
					_app_.poll_option();
					_app_.poll_option();
					_app_.disable_ctrls();
				}
			}
		},
		poll_option: function() {
			var _app_ = this;

			if (_app_.poll.length < 4) {
				var poll_option_data = Object({
					title: _app_.data_temp.poll.title,
					value: _app_.data_temp.poll.value
				});

				_app_.poll.push(poll_option_data);
			}
			else{
				return false;
			}
		},
		cancel_poll: function() {
			var _app_          = this;
			_app_.active_media = null;
			_app_.poll         = [];

			_app_.disable_ctrls();
		},
		select_images: function() {
			var _app_ = this;

			if (_app_.active_media == 'image' || cl_empty(_app_.active_media)) {
				if (_app_.image_ctrl) {
					var app_el = $(_app_.$el);
					app_el.find('input[data-an="images-input"]').trigger('click');
				}
			}
		},
		select_video: function() {
			var _app_ = this;

			if (cl_empty(_app_.active_media)) {
				if (_app_.video_ctrl) {
					var app_el = $(_app_.$el);
					app_el.find('input[data-an="video-input"]').trigger('click');
				}
			}
		},
		select_music: function() {
			var _app_ = this;

			if (cl_empty(_app_.active_media)) {
				if (_app_.music_ctrl) {
					var app_el = $(_app_.$el);
					app_el.find('input[data-an="music-input"]').trigger('click');
				}
			}
		},
		select_doc: function() {
			var _app_ = this;

			if (cl_empty(_app_.active_media)) {
				if (_app_.doc_ctrl) {
					var app_el = $(_app_.$el);
					app_el.find('input[data-an="doc-input"]').trigger('click');
				}
			}
		},
		record_audio_start: function() {
			var _app_ = this;

			if (cl_empty(_app_.active_media) && _app_.audio_ctrl) {
				try {
					window.AudioContext     = (window.AudioContext || window.webkitAudioContext);
					navigator.getUserMedia  = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia);
					window.URL              = (window.URL || window.webkitURL);
					_app_.audio_rec.context = new AudioContext();

					navigator.getUserMedia({audio: true}, function(stream) {
						_app_.audio_rec.stream   = stream;
						_app_.audio_rec.recorder = new Recorder(_app_.audio_rec.context.createMediaStreamSource(stream), {
							type: "audio/mpeg"
						});

						_app_.audio_rec.recorder.record();
						_app_.audio_rec.is_recording = true;

						_app_.audio_rec.record_timeint = setInterval(function() {
							if (_app_.audio_rec.record_time < Number(_app_.audio_rec.max_length)) {
								_app_.audio_rec.record_time += 1;
								_app_.audio_rec.record_ftime = new Date(_app_.audio_rec.record_time * 1000).toISOString().substr(14, 5);
							}
							else{
								_app_.record_audio_stop();
							}
						}, 1000);

						_app_.active_media = "audio";
						_app_.disable_ctrls();

					}, function(e) {
				    	cl_bs_notify(e, 3000, "danger")
				    });
				} 
				catch (e) {
					cl_bs_notify(e, 3000, "danger");
				}
			}
		},
		record_audio_stop: function() {
			var _app_ = this;

			_app_.audio_rec.recorder.stop();
		
			_app_.audio_rec.is_recording = false;
			_app_.audio_rec.record_time  = 0;
			_app_.audio_rec.record_ftime = "00:00";

			clearInterval(_app_.audio_rec.record_timeint);

			_app_.audio_rec.recorder.exportWAV(function(blob) {
				
				var record_url = window.URL.createObjectURL(blob);
				var file_name  = "csm-{0}.mp3".format((new Date).toISOString().replace(/:|\./g, '_'));
		        var file_data  = new File([blob], file_name, {type: 'audio/mpeg'});
		       	var form_data  = new FormData();
			       	
			    if (SMColibri.max_upload(file_data.size)) {
			       	form_data.append('audio_file', file_data);

					$.ajax({
						url: '<?php echo cl_link("native_api/main/upload_post_arecord"); ?>',
						type: 'POST',
						dataType: 'json',
						enctype: 'multipart/form-data',
						data: form_data,
						cache: false,
				        contentType: false,
				        processData: false,
				        timeout: 600000,
					}).done(function(data) {
						if(data.status == 200){
							_app_.audio = data.audio;
						}
					}).always(function() {
						_app_.record_audio_finish();
					});
				}
				else{
					_app_.record_audio_finish();
					_app_.record_audio_reset();
				}
		    }, "audio/mpeg");
		},
		record_audio_finish: function() {
			var _app_ = this;
			_app_.audio_rec.recorder.clear();
			try{
				
				_app_.audio_rec.status   = 0;
				_app_.audio_rec.recorder = false;

				_app_.audio_rec.stream.getTracks().forEach(function(track) { 
					track.stop() 
				});
			}
			catch(e) {/*pass*/}
		},
		record_audio_reset: function() {
			var _app_ = this;

			_app_.active_media = null;
			_app_.disable_ctrls();
		},
		select_gifs: function() {
			var _app_ = this;
			var step  = false;

			if (cl_empty(_app_.active_media)) {
				$.ajax({
					url: 'https://api.giphy.com/v1/gifs/trending',
					type: 'GET',
					dataType: 'json',
					data: {
						api_key: '{%config giphy_api_key%}',
						limit: 50,
						lang: cl_get_ulang(),
						fmt: 'json'
					},
				}).done(function(data) {
					if (data.meta.status == 200 && data.data.length > 0) {
						for (var i = 0; i < data.data.length; i++) {
							if (step) {
								_app_.gifs_r1.push({
									thumb: data['data'][i]['images']['preview_gif']['url'],
									src: data['data'][i]['images']['original']['url'],
									title: data['data'][i]['title']
								});
							}
							else {
								_app_.gifs_r2.push({
									thumb: data['data'][i]['images']['preview_gif']['url'],
									src: data['data'][i]['images']['original']['url'],
									title: data['data'][i]['title']
								});
							}

							step = !step;
						}
					}
				}).always(function() {
					if (_app_.gifs && cl_empty(_app_.active_media)) {
						_app_.active_media = "gifs";
					}

					_app_.disable_ctrls();
				});
			}
		},
		search_gifs: function(_self = null) {
			if (_self.target.value.length >= 2) {
				var query   = $.trim(_self.target.value);
				var step    = false;
				var _app_   = this;
				var gifs_r1 = _app_.gifs_r1;
				var gifs_r2 = _app_.gifs_r2;

				$.ajax({
					url: 'https://api.giphy.com/v1/gifs/search',
					type: 'GET',
					dataType: 'json',
					data: {
						q: query,
						api_key:'{%config giphy_api_key%}',
						limit: 50,
						lang:'en',
						fmt:'json'
					}
				}).done(function(data) {
					if (data.meta.status == 200 && data.data.length > 0) {
						_app_.gifs_r1 = [];
						_app_.gifs_r2 = [];

						for (var i = 0; i < data.data.length; i++) {
							if (step) {
								_app_.gifs_r1.push({
									thumb: data['data'][i]['images']['preview_gif']['url'],
									src: data['data'][i]['images']['original']['url'],
								});
							}
							else {
								_app_.gifs_r2.push({
									thumb: data['data'][i]['images']['preview_gif']['url'],
									src: data['data'][i]['images']['original']['url'],
								});
							}

							step = !step;
						}
					}
					else {
						_app_.gifs_r1 = gifs_r1;
						_app_.gifs_r2 = gifs_r2;
					}
				});
			}
		},
		preview_gif: function(_self = null) {
			var _app_ = this;

			if (_self.target) {
				_app_.gif_source = $(_self.target).data('source');
			}
		},
		rm_preview_gif: function() {
			var _app_ = this;

			_app_.gif_source = null;
		},
		close_gifs: function() {
			var _app_          = this;
			_app_.gifs_r1      = [];
			_app_.gifs_r2      = [];
			_app_.active_media = null;
			_app_.disable_ctrls();
		},
		rm_gif_preloader(_self = null) {
			if (_self.target) {
				$(_self.target).siblings('div').remove();
				$(_self.target).parent('div').removeClass('loading');
			}
		},
		upload_images: function(event = null) {
			var _app_  = this;
			var app_el = $(_app_.$el);

			if (cl_empty(_app_.active_media) || _app_.active_media == 'image') {
				var images = event.target.files;

				if (SMColibri.curr_pn == 'thread') {
	        		$('div[data-app="modal-pubbox"]').addClass('vis-hidden');
	        	}

				SMColibri.progress_bar("show");

				if (images.length) {
					for (var i = 0; i < images.length; i++) {
						if (SMColibri.max_upload(images[i].size)) {


							var form_data  = new FormData();
							var break_loop = false;
							form_data.append('delay', 1);
							form_data.append('image', images[i]);
							form_data.append('hash', "<?php echo fetch_or_get($cl['csrf_token'],'none'); ?>");
							
							$.ajax({
								url: '<?php echo cl_link("native_api/main/upload_post_image"); ?>',
								type: 'POST',
								dataType: 'json',
								enctype: 'multipart/form-data',
								data: form_data,
								cache: false,
						        contentType: false,
						        processData: false,
						        timeout: 600000,
						        beforeSend: function() {
						        	_app_.submitting = true;
						        },
								success: function(data) {
									if (data.status == 200) {
										_app_.images.push(data.img);
									}
									else if(data.err_code == "total_limit_exceeded") {
										cl_bs_notify("<?php echo cl_translate('You cannot attach more than 10 images to this post.'); ?>", 1500, "danger");
										break_loop = true;
									}
									else {
										SMColibri.errorMSG();
									}
								},
								complete: function() {
									if (_app_.images.length && cl_empty(_app_.active_media)) {
										_app_.active_media = "image";
									}

									_app_.disable_ctrls();

									_app_.submitting = false;
								}
							});

							if (break_loop) {break;}
						}
					}
				}

				setTimeout(function() {
					SMColibri.progress_bar("end");

					if (SMColibri.curr_pn == 'thread') {
		        		$('div[data-app="modal-pubbox"]').removeClass('vis-hidden');
		        	}
				}, 1500);

				app_el.find('input[data-an="images-input"]').val('');
			}
		},
		upload_video: function(event = null) {
			var _app_  = this;
			var app_el = $(_app_.$el);

			if (cl_empty(_app_.active_media)) {
				var video  = event.target.files[0];

				if (video && SMColibri.max_upload(video.size)) {

				    SMColibri.progress_bar("show");

					var form_data = new FormData();
					form_data.append('video', video);
					form_data.append('hash', "<?php echo fetch_or_get($cl['csrf_token'],'none'); ?>");

					$.ajax({
						url: '<?php echo cl_link("native_api/main/upload_post_video"); ?>',
						type: 'POST',
						dataType: 'json',
						enctype: 'multipart/form-data',
						data: form_data,
						cache: false,
						async: false,
				        contentType: false,
				        processData: false,
				        timeout: 600000,
				        beforeSend: function() {

				        	if (SMColibri.curr_pn == 'thread') {
				        		$('div[data-app="modal-pubbox"]').addClass('vis-hidden');
				        	}
				        },
						success: function(data) {
							if (data.status == 200) {
								_app_.video = data.video;
							}
							else if(data.err_code == "total_limit_exceeded") {
								cl_bs_notify("<?php echo cl_translate('You cannot attach more than 1 video to this post.'); ?>", 1500, "danger");
							}
							else {
								if (data.error) {
									cl_bs_notify(data.error, "danger");
								}
								else{
									SMColibri.errorMSG();
								}
							}
						},
						complete: function() {
							if ($.isEmptyObject(_app_.video) != true && cl_empty(_app_.active_media)) {
								_app_.active_media = "video";
							}

							_app_.disable_ctrls();
							app_el.find('input[data-an="video-input"]').val('');

							setTimeout(function() {
								SMColibri.progress_bar("end");

								if (SMColibri.curr_pn == 'thread') {
					        		$('div[data-app="modal-pubbox"]').removeClass('vis-hidden');
					        	}
							}, 1500);
						}
					});
				}
			}
		},
		upload_music: function(event = null) {
			var _app_  = this;
			var app_el = $(_app_.$el);

			if (cl_empty(_app_.active_media)) {
				var music  = event.target.files[0];

				if (music && SMColibri.max_upload(music.size)) {

				    SMColibri.progress_bar("show");

					var form_data = new FormData();
					form_data.append('music_file', music);
					form_data.append('hash', "<?php echo fetch_or_get($cl['csrf_token'],'none'); ?>");

					$.ajax({
						url: '<?php echo cl_link("native_api/main/upload_post_music"); ?>',
						type: 'POST',
						dataType: 'json',
						enctype: 'multipart/form-data',
						data: form_data,
						cache: false,
						async: false,
				        contentType: false,
				        processData: false,
				        timeout: 600000,
				        beforeSend: function() {
				        	if (SMColibri.curr_pn == 'thread') {
				        		$('div[data-app="modal-pubbox"]').addClass('vis-hidden');
				        	}
				        },
						success: function(data) {
							if (data.status == 200) {
								_app_.music = data.music;
							}
							else if(data.err_code == "total_limit_exceeded") {
								cl_bs_notify("<?php echo cl_translate('You cannot attach more than 1 audio file to this post.'); ?>", 1500, "danger");
							}
							else {
								if (data.error) {
									cl_bs_notify(data.error, "danger");
								}
								else{
									SMColibri.errorMSG();
								}
							}
						},
						complete: function() {
							if ($.isEmptyObject(_app_.music) != true && cl_empty(_app_.active_media)) {
								_app_.active_media = "music";
							}

							_app_.disable_ctrls();
							app_el.find('input[data-an="music-input"]').val('');

							setTimeout(function() {
								SMColibri.progress_bar("end");

								if (SMColibri.curr_pn == 'thread') {
					        		$('div[data-app="modal-pubbox"]').removeClass('vis-hidden');
					        	}
							}, 1500);
						}
					});
				}
			}
		},
		upload_document: function(event = null) {
			var _app_  = this;
			var app_el = $(_app_.$el);

			if (cl_empty(_app_.active_media)) {
				var doc  = event.target.files[0];

				if (doc && SMColibri.max_upload(doc.size)) {

				    SMColibri.progress_bar("show");

					var form_data = new FormData();
					form_data.append('doc_file', doc);
					form_data.append('hash', "<?php echo fetch_or_get($cl['csrf_token'],'none'); ?>");

					$.ajax({
						url: '<?php echo cl_link("native_api/main/upload_post_document"); ?>',
						type: 'POST',
						dataType: 'json',
						enctype: 'multipart/form-data',
						data: form_data,
						cache: false,
						async: false,
				        contentType: false,
				        processData: false,
				        timeout: 600000,
				        beforeSend: function() {
				        	if (SMColibri.curr_pn == 'thread') {
				        		$('div[data-app="modal-pubbox"]').addClass('vis-hidden');
				        	}
				        },
						success: function(data) {
							if (data.status == 200) {
								_app_.document = data.document;
							}
							else if(data.err_code == "total_limit_exceeded") {
								cl_bs_notify("<?php echo cl_translate('You cannot attach more than 1 document file to this post.'); ?>", 1500, "danger");
							}
							else {
								if (data.error) {
									cl_bs_notify(data.error, 3000, "danger");
								}
								else{
									SMColibri.errorMSG();
								}
							}
						},
						complete: function() {
							if ($.isEmptyObject(_app_.document) != true && cl_empty(_app_.active_media)) {
								_app_.active_media = "doc";
							}

							_app_.disable_ctrls();
							app_el.find('input[data-an="doc-input"]').val('');

							setTimeout(function() {
								SMColibri.progress_bar("end");

								if (SMColibri.curr_pn == 'thread') {
					        		$('div[data-app="modal-pubbox"]').removeClass('vis-hidden');
					        	}
							}, 1500);
						}
					});
				}
			}
		},
		delete_image: function(id = null) {
			if (cl_empty(id)) {
				return false;
			}

			else {
				var _app_ = this;

				for (var i = 0; i < _app_.images.length; i++) {
					if (_app_.images[i]['id'] == id) {
						_app_.images.splice(i, 1);
					}
				}

				$.ajax({
					url: '<?php echo cl_link("native_api/main/delete_post_image"); ?>',
					type: 'POST',
					dataType: 'json',
					data: {image_id: id},
				}).done(function(data) {
					if (data.status != 200) {
						SMColibri.errorMSG();
					}
				}).always(function() {
					if (cl_empty(_app_.images.length)) {
						_app_.active_media = null;
					}

					_app_.disable_ctrls();
				});
			}
		},
		delete_video: function() {
			var _app_ = this;

			$.ajax({
				url: '<?php echo cl_link("native_api/main/delete_post_video"); ?>',
				type: 'POST',
				dataType: 'json',
			}).done(function(data) {
				if (data.status != 200) {
					SMColibri.errorMSG();
				}
				else {
					_app_.video = Object({});
				}
			}).always(function() {
				if ($.isEmptyObject(_app_.video)) {
					_app_.active_media = null;
				}

				_app_.disable_ctrls();
			});
		},
		delete_audio_file: function() {
			var _app_ = this;

			$.ajax({
				url: '<?php echo cl_link("native_api/main/delete_post_audiofile"); ?>',
				type: 'POST',
				dataType: 'json',
			}).done(function(data) {
				if (data.status != 200) {
					SMColibri.errorMSG();
				}
				else {
					_app_.audio = Object({});
					_app_.music = Object({});
				}
			}).always(function() {
				if ($.isEmptyObject(_app_.audio)) {
					_app_.active_media = null;
				}
				if ($.isEmptyObject(_app_.music)) {
					_app_.active_media = null;
				}

				_app_.disable_ctrls();
			});
		},
		delete_music: function() {
			var _app_ = this;

			_app_.delete_audio_file();
		},
		delete_document: function() {
			var _app_ = this;

			$.ajax({
				url: '<?php echo cl_link("native_api/main/delete_post_document"); ?>',
				type: 'POST',
				dataType: 'json',
			}).done(function(data) {
				if (data.status != 200) {
					SMColibri.errorMSG();
				}
				else {
					_app_.document = Object({});
				}
			}).always(function() {
				if ($.isEmptyObject(_app_.document)) {
					_app_.active_media = null;
				}

				_app_.disable_ctrls();
			});
		},
		delete_record: function() {
			var _app_ = this;

			_app_.delete_audio_file();
		},
		disable_ctrls: function() {
			var _app_ = this;

			if (_app_.active_media == 'image' && _app_.images.length >= 10) {
				_app_.image_ctrl = false;
				_app_.gif_ctrl   = false;
				_app_.video_ctrl = false;
				_app_.poll_ctrl  = false;
				_app_.audio_ctrl = false;
				_app_.music_ctrl = false;
				_app_.doc_ctrl   = false;
			}
			else if(_app_.active_media == 'image' && _app_.images.length < 10) {
				_app_.image_ctrl = true;
				_app_.gif_ctrl   = false;
				_app_.video_ctrl = false;
				_app_.poll_ctrl  = false;
				_app_.audio_ctrl = false;
				_app_.music_ctrl = false;
				_app_.doc_ctrl   = false;
			}
			else if(_app_.active_media == 'audio') {
				_app_.image_ctrl = false;
				_app_.gif_ctrl   = false;
				_app_.video_ctrl = false;
				_app_.poll_ctrl  = false;
				_app_.audio_ctrl = true;
				_app_.music_ctrl = false;
				_app_.doc_ctrl   = false;
			}
			else if(_app_.active_media == 'music') {
				_app_.image_ctrl = false;
				_app_.gif_ctrl   = false;
				_app_.video_ctrl = false;
				_app_.poll_ctrl  = false;
				_app_.audio_ctrl = false;
				_app_.music_ctrl = true;
				_app_.doc_ctrl   = false;
			}
			else if(_app_.active_media == 'doc') {
				_app_.image_ctrl = false;
				_app_.gif_ctrl   = false;
				_app_.video_ctrl = false;
				_app_.poll_ctrl  = false;
				_app_.audio_ctrl = false;
				_app_.music_ctrl = false;
				_app_.doc_ctrl   = true;
			}
			else if(_app_.active_media == 'video') {
				_app_.image_ctrl = false;
				_app_.gif_ctrl   = false;
				_app_.video_ctrl = true;
				_app_.poll_ctrl  = false;
				_app_.audio_ctrl = false;
				_app_.music_ctrl = false;
				_app_.doc_ctrl   = false;
			}
			else if(_app_.active_media == 'gifs') {
				_app_.image_ctrl = false;
				_app_.gif_ctrl   = true;
				_app_.video_ctrl = false;
				_app_.poll_ctrl  = false;
				_app_.audio_ctrl = false;
				_app_.music_ctrl = false;
				_app_.doc_ctrl   = false;
			}
			else {
				_app_.image_ctrl = true;
				_app_.gif_ctrl   = true;
				_app_.video_ctrl = true;
				_app_.poll_ctrl  = true;
				_app_.audio_ctrl = true;
				_app_.music_ctrl = true;
				_app_.doc_ctrl   = true;
			}
		},
		reset_data: function() {
			var _app_ = this;

			if (_app_.active_media == "audio") {
				_app_.record_audio_reset();
			}

			_app_.image_ctrl   = true;
			_app_.gif_ctrl     = true;
			_app_.poll_ctrl    = true;
			_app_.video_ctrl   = true;
			_app_.audio_ctrl   = true;
			_app_.music_ctrl   = true;
			_app_.doc_ctrl     = true;
			_app_.og_imported  = false;
			_app_.text         = "";
			_app_.images       = [];
			_app_.video        = Object({});
			_app_.document     = Object({});
			_app_.music        = Object({});
			_app_.audio        = Object({});
			_app_.og_data      = Object({});
			_app_.poll         = [];
			_app_.active_media = null;
			_app_.gif_source   = null;
			_app_.gifs_r1      = [];
			_app_.gifs_r2      = [];
			_app_.og_hidden    = [];
			_app_.emoticons_picker = Object({
				icons: _app_.emoticons_picker.icons,
				status: false,
				active_group: "people"
			});

			$(_app_.$refs.text_input).removeAttr("style");
		},
		rm_preview_og: function() {
			var _app_         = this;
			_app_.og_hidden.push(_app_.og_data.url);

			_app_.og_imported = false;
			_app_.og_data     = Object({});
		}
	},
	updated: function() {
		var _app_ = this;

		delay(function() {
			if (_app_.og_imported != true) {
				var text_links = _app_.text.match(/(https?:\/\/[^\s]+)/);

				if (text_links && text_links.length > 0 && _app_.og_hidden.contains(text_links[0]) != true) {
					$.ajax({
						url: '<?php echo cl_link("native_api/main/import_og_data"); ?>',
						type: 'POST',
						dataType: 'json',
						data: {
							url: text_links[0]
						}
					}).done(function(data) {
						if (data.status == 200) {
							_app_.og_imported = true;
							_app_.og_data     = data.og_data;
						}
					});
				}
			}
		}, 800);


		if (_app_.active_media == "poll") {
			_app_.text_ph = "<?php echo cl_translate('Enter your question here'); ?>";
		}
		else {
			if (_app_.thread_id) {
				_app_.text_ph = "<?php echo cl_translate('Enter your reply here'); ?>";

				$('[data-app="modal-pubbox"]').find('h5[data-an="modal-title"]').text("<?php echo cl_translate('Post a reply'); ?>");
			}

			else{
				_app_.text_ph = _app_.text_ph_orig;

				$('[data-app="modal-pubbox"]').find('h5[data-an="modal-title"]').text("<?php echo cl_translate('New post'); ?>");
			}
		}
	},
	mounted: function() {
		var _app_ = this;

		<?php if (not_empty($me['draft_post'])): ?>
			if ($(this.$el).attr('id') == 'vue-pubbox-app-1') {
				$.ajax({
					url: '<?php echo cl_link("native_api/main/get_draft_post"); ?>',
					type: 'GET',
					dataType: 'json'
				}).done(function(data) {
					if (data.status == 200 && data.type == "image") {
						_app_.images       = data.images;
						_app_.active_media = 'image';
					}
					else if(data.status == 200 && data.type == "video") {
						_app_.video        = data.video;
						_app_.active_media = 'video';
					}
					else if(data.status == 200 && data.type == "audio") {
						_app_.audio        = data.audio;
						_app_.active_media = 'audio';
					}
					else if(data.status == 200 && data.type == "document") {
						_app_.document     = data.document;
						_app_.active_media = 'doc';
					}
					else {
						return false;
					}

					if (data.status == 200) {
						cl_bs_notify("<?php echo cl_translate('Please finish editing the post or delete media files!'); ?>", 3000, "danger");
					}
				}).always(function() {
					_app_.disable_ctrls();
				});
			}
		<?php endif; ?>

		_app_.text_ph = _app_.text_ph_orig;
	}
});
