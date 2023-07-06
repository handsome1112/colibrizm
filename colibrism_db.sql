/*
SQLyog Trial v13.1.8 (64 bit)
MySQL - 10.1.29-MariaDB : Database - colibrism_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`colibrism_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `colibrism_db`;

/*Table structure for table `cl_acc_validations` */

DROP TABLE IF EXISTS `cl_acc_validations`;

CREATE TABLE `cl_acc_validations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hash` varchar(120) NOT NULL DEFAULT '0',
  `json` text,
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_acc_validations` */

/*Table structure for table `cl_ads` */

DROP TABLE IF EXISTS `cl_ads`;

CREATE TABLE `cl_ads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `cover` varchar(3000) NOT NULL DEFAULT '',
  `company` varchar(120) NOT NULL DEFAULT '',
  `target_url` varchar(1200) NOT NULL DEFAULT '',
  `status` enum('orphan','active','inactive') NOT NULL DEFAULT 'orphan',
  `approved` enum('Y','N') NOT NULL DEFAULT 'N',
  `audience` varchar(3000) NOT NULL DEFAULT '[]',
  `description` varchar(600) NOT NULL DEFAULT '',
  `cta` varchar(300) NOT NULL DEFAULT '',
  `budget` varchar(15) NOT NULL DEFAULT '0.00',
  `clicks` int(11) NOT NULL DEFAULT '0',
  `views` int(11) NOT NULL DEFAULT '0',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_ads` */

/*Table structure for table `cl_affiliate_payouts` */

DROP TABLE IF EXISTS `cl_affiliate_payouts`;

CREATE TABLE `cl_affiliate_payouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `email` varchar(120) NOT NULL DEFAULT '',
  `amount` varchar(25) NOT NULL DEFAULT '0.00',
  `bonuses` int(11) NOT NULL DEFAULT '0',
  `status` enum('pending','paid') NOT NULL DEFAULT 'pending',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_affiliate_payouts` */

/*Table structure for table `cl_banktrans_requests` */

DROP TABLE IF EXISTS `cl_banktrans_requests`;

CREATE TABLE `cl_banktrans_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `amount` varchar(11) NOT NULL DEFAULT '0.00',
  `receipt_img` varchar(1000) NOT NULL,
  `message` varchar(1210) NOT NULL DEFAULT '',
  `currency` varchar(4) NOT NULL DEFAULT 'USD',
  `trans_id` varchar(130) NOT NULL DEFAULT '',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `cl_banktrans_requests` */

/*Table structure for table `cl_blocks` */

DROP TABLE IF EXISTS `cl_blocks`;

CREATE TABLE `cl_blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `profile_id` int(11) NOT NULL DEFAULT '0',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_blocks` */

/*Table structure for table `cl_bookmarks` */

DROP TABLE IF EXISTS `cl_bookmarks`;

CREATE TABLE `cl_bookmarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publication_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_bookmarks` */

/*Table structure for table `cl_chats` */

DROP TABLE IF EXISTS `cl_chats`;

CREATE TABLE `cl_chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_one` int(11) NOT NULL DEFAULT '0',
  `user_two` int(11) NOT NULL DEFAULT '0',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_chats` */

/*Table structure for table `cl_configs` */

DROP TABLE IF EXISTS `cl_configs`;

CREATE TABLE `cl_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(120) NOT NULL DEFAULT '',
  `name` varchar(120) NOT NULL DEFAULT '',
  `value` varchar(3000) NOT NULL DEFAULT '',
  `regex` varchar(120) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;

/*Data for the table `cl_configs` */

insert  into `cl_configs`(`id`,`title`,`name`,`value`,`regex`) values 
(1,'Theme','theme','default',''),
(2,'Site name','name','ColibriSM','/^(.){0,50}$/'),
(3,'Site title','title','ColibriSM','/^(.){0,150}$/'),
(4,'Site description','description','ColibriSM - The Ultimate Modern Social Media Sharing Platform','/^(.){0,350}$/'),
(5,'SEO keywords','keywords','ColibriSM, Wallet Connet, Metamask',''),
(6,'Site logo','site_logo','statics/img/logo.png',''),
(7,'Site favicon','site_favicon','statics/img/favicon.png',''),
(8,'Chat wallpaper','chat_wp','statics/img/chatwp/default.png',''),
(9,'Account activation','acc_validation','off','/^(on|off)$/'),
(10,'Default language','language','english',''),
(11,'AS3 storage','as3_storage','off','/^(on|off)$/'),
(12,'E-mail address','email','topcoder728@gmail.com',''),
(13,'SMTP server','smtp_or_mail','smtp','/^(smtp|mail)$/'),
(14,'SMTP host','smtp_host','',''),
(15,'SMTP password','smtp_password','','/^(.){0,50}$/'),
(16,'SMTP encryption','smtp_encryption','tls','/^(ssl|tls)$/'),
(17,'SMTP port','smtp_port','587','/^[0-9]{1,11}$/'),
(18,'SMTP username','smtp_username','',''),
(19,'FFMPEG binary','ffmpeg_binary','core/libs/ffmpeg/ffmpeg','/^(.){0,550}$/'),
(20,'Giphy api','giphy_api_key','EEoFiCosGuyEIWlXnRuw4McTLxfjCrl1','/^(.){0,150}$/'),
(21,'Google analytics','google_analytics','',''),
(22,'Facebook API ID','facebook_api_id','','/^(.){0,150}$/'),
(23,'Facebook API Key','facebook_api_key','','/^(.){0,150}$/'),
(24,'Twitter API ID','twitter_api_id','','/^(.){0,150}$/'),
(25,'Twitter API Key','twitter_api_key','','/^(.){0,150}$/'),
(26,'Google API ID','google_api_id','','/^(.){0,150}$/'),
(27,'Google API Key','google_api_key','','/^(.){0,150}$/'),
(28,'Script version','version','1.3.5',''),
(29,'Last backup','last_backup','0',''),
(30,'Sitemap last update','sitemap_update','',''),
(31,'Affiliate bonus rate','aff_bonus_rate','0.10','/^([0-9]{1,3}\\.[0-9]{1,3}|[0-9]{1,3})$/'),
(32,'Affiliates System','affiliates_system','on','/^(on|off)$/'),
(33,'PayPal API Public key','paypal_api_key','',''),
(34,'PayPal API Secret key','paypal_api_pass','',''),
(35,'PayPal Payment Mode','paypal_mode','sandbox','/^(sandbox|live)$/'),
(36,'Site currency','site_currency','usd',' \r\n/^([a-zA-Z]){2,7}$/'),
(37,'Advertising system','advertising_system','on','/^(on|off)$/'),
(38,'Ad conversion rate','ad_conversion_rate','0.05','/^([0-9]{1,3}\\.[0-9]{1,3}|[0-9]{1,3})$/'),
(39,'Max post length','max_post_len','600','/^[0-9]{1,11}$/'),
(40,'Google oAuth','google_oauth','on','/^(on|off)$/'),
(41,'Twitter oAuth','twitter_oauth','on','/^(on|off)$/'),
(42,'Facebook oAuth','facebook_oauth','on','/^(on|off)$/'),
(43,'Google ads (Horiz-banner)','google_ad_horiz','',''),
(44,'Google ads (Vert-banner)','google_ad_vert','',''),
(45,'Default country','country_id','1','/^[0-9]{1,11}$/'),
(46,'Firebase API key','firebase_api_key','',''),
(47,'Push notifications','push_notifs','on','/^(on|off)$/'),
(48,'Page update interval','page_update_interval','30','/^[0-9]{1,11}$/'),
(49,'Chat update interval','chat_update_interval','5','/^[0-9]{1,11}$/'),
(50,'Amazon S3 storage','as3_storage','off','/^(on|off)$/'),
(51,'AS3 bucket name','as3_bucket_name','',''),
(52,'Amazon S3 API key','as3_api_key','',''),
(53,'Amazon S3 API secret key','as3_api_secret_key','',''),
(54,'AS3 bucket region','as3_bucket_region','us-east-1',''),
(55,'Max upload size','max_upload_size','24000000','/^[0-9]{1,11}$/'),
(56,'Max post audio record length','post_arec_length','30','/^[0-9]{1,11}$/'),
(57,'Wallet topup min amount','wallet_min_amount','50','/^([0-9]{1,3}\\.[0-9]{1,3}|[0-9]{1,3})$/'),
(58,'','','',''),
(59,'Currency symbol position','currency_symbol_pos','after','/^(before|after)$/'),
(60,'Aff payout min amount','aff_payout_min','50','/^([0-9]{1,3}\\\\.[0-9]{1,3}|[0-9]{1,3})$/'),
(61,'Default color scheme','default_color_scheme','default',''),
(62,'Default BG color','default_bg_color','default',''),
(63,'Android app (Google play item URL)','android_app_url','',''),
(64,'IOS app (App store item URL)','ios_app_url','',''),
(65,'User registration system','user_signup','on','/^(on|off)$/'),
(66,'Cookie warning popup','cookie_warning_popup','on','/^(on|off)$/'),
(67,'Google reCAPTCHA','google_recaptcha','off','/^(on|off)$/'),
(68,'Google reCAPTCHA Sitekey','google_recap_key1','',''),
(69,'Google reCAPTCHA Secret key','google_recap_key2','',''),
(70,'E-Mail notifications','email_notifications','off','/^(on|off)$/'),
(71,'Swifts system status (Daily stories)','swift_system_status','on','/^(on|off)$/'),
(72,'PayPal Payment Status','paypal_method_status','on','/^(on|off)$/'),
(73,'PayStack API Public key','paystack_api_key','',''),
(74,'Paystack API Secret key','paystack_api_pass','',''),
(75,'Paystack Payment Status','paystack_method_status','on','/^(on|off)$/'),
(76,'Stripe API Secret key','stripe_api_pass','',''),
(77,'Stripe API Public key','stripe_api_key','',''),
(78,'Stripe Payment Status','stripe_method_status','on','/^(on|off)$/'),
(79,'AliPay Payment Status','alipay_method_status','on','/^(on|off)$/'),
(80,'Timezone','timezone','UTC',''),
(81,'Bank transfer gateway','bank_method_status','on','/^(on|off)$/'),
(82,'Bank account number','bt_bank_account_number','',''),
(83,'Routing code','bt_bank_routing_code','',''),
(84,'Bank account name','bt_bank_account_name','',''),
(85,'Bank country','bt_bank_country_name','1',''),
(86,'Bank address','bt_bank_address','',''),
(87,'Bank name','bt_bank_name','',''),
(88,'Bank SVG Logo','bt_bank_svg_logo','',''),
(89,'System API status','system_api_status','on','/^(on|off)$/'),
(90,'Guest page status','guest_page_status','on','/^(on|off)$/'),
(91,'Username restrictions','username_restrictions','',''),
(92,'User email restrictions','useremail_restrictions','',''),
(93,'Post video download system','post_video_download_system','on','/^(on|off)$/'),
(94,'RazorPay payment method status','rzp_method_status','on','/^(on|off)$/'),
(95,'RazorPay API Public key','rzp_api_key','',''),
(96,'RazorPay API Secret key','rzp_api_secret','',''),
(97,'LinkedIN oAuth status','linkedin_oauth','on','/^(on|off)$/'),
(98,'LinkedIn API ID','linkedin_api_id','',''),
(99,'LinkedIn API Key','linkedin_api_key','',''),
(100,'Discord oAuth status','discord_status','on','/^(on|off)$/'),
(101,'Discord API ID','discord_api_id','',''),
(102,'Discord API Key','discord_api_key','',''),
(103,'Vkontakte oAuth status','vkontakte_status','on','/^(on|off)$/'),
(104,'Vkontakte API ID','vkontakte_api_id','',''),
(105,'Vkontakte API Key','vkontakte_api_key','',''),
(106,'Instagram oAuth status','instagram_status','on','/^(on|off)$/'),
(107,'Instagram API ID','instagram_api_id','',''),
(108,'Instagram API Key','instagram_api_key','',''),
(109,'Premium account system status','prem_account_system_status','off','/^(on|off)$/'),
(110,'Premium account m/price','premium_account_mprice','0.00','/^([0-9]{1,11}\\.[0-9]{1,11}|[0-9]{1,11})$/'),
(111,'Non-binary gender','non_binary_gender','on','/^(on|off)$/'),
(112,'Post audio download system','post_audio_download_system','on','/^(on|off)$/');

/*Table structure for table `cl_connections` */

DROP TABLE IF EXISTS `cl_connections`;

CREATE TABLE `cl_connections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower_id` int(11) NOT NULL DEFAULT '0',
  `following_id` int(11) NOT NULL DEFAULT '0',
  `status` enum('active','pending') NOT NULL DEFAULT 'active',
  `time` varchar(25) NOT NULL DEFAULT '25',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `cl_connections` */

insert  into `cl_connections`(`id`,`follower_id`,`following_id`,`status`,`time`) values 
(1,14,13,'active','1688555901'),
(2,14,12,'active','1688555901'),
(3,14,11,'active','1688555902'),
(4,14,4,'active','1688555903');

/*Table structure for table `cl_hashtags` */

DROP TABLE IF EXISTS `cl_hashtags`;

CREATE TABLE `cl_hashtags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `posts` int(11) NOT NULL DEFAULT '0',
  `tag` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_hashtags` */

/*Table structure for table `cl_invite_links` */

DROP TABLE IF EXISTS `cl_invite_links`;

CREATE TABLE `cl_invite_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(300) NOT NULL DEFAULT '',
  `role` set('user','admin') NOT NULL DEFAULT 'user',
  `mnu` varchar(11) NOT NULL DEFAULT '1',
  `expires_at` varchar(25) NOT NULL DEFAULT '0',
  `registered_users` int(11) NOT NULL DEFAULT '0',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_invite_links` */

/*Table structure for table `cl_messages` */

DROP TABLE IF EXISTS `cl_messages`;

CREATE TABLE `cl_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sent_by` int(11) NOT NULL DEFAULT '0',
  `sent_to` int(11) NOT NULL DEFAULT '0',
  `owner` int(11) NOT NULL DEFAULT '0',
  `message` varchar(3000) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `media_file` varchar(1000) NOT NULL DEFAULT '',
  `media_type` varchar(25) NOT NULL DEFAULT 'none',
  `seen` varchar(25) NOT NULL DEFAULT '0',
  `deleted_fs1` enum('Y','N') NOT NULL DEFAULT 'N',
  `deleted_fs2` enum('Y','N') NOT NULL DEFAULT 'N',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_messages` */

/*Table structure for table `cl_notifications` */

DROP TABLE IF EXISTS `cl_notifications`;

CREATE TABLE `cl_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notifier_id` int(11) NOT NULL DEFAULT '0',
  `recipient_id` int(11) NOT NULL DEFAULT '0',
  `status` enum('0','1') NOT NULL DEFAULT '0',
  `subject` varchar(32) NOT NULL DEFAULT 'none',
  `entry_id` int(11) NOT NULL DEFAULT '0',
  `json` varchar(1200) NOT NULL DEFAULT '[]',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `cl_notifications` */

insert  into `cl_notifications`(`id`,`notifier_id`,`recipient_id`,`status`,`subject`,`entry_id`,`json`,`time`) values 
(1,14,13,'1','subscribe',14,'[]','1688555901'),
(2,14,12,'0','subscribe',14,'[]','1688555901'),
(3,14,11,'0','subscribe',14,'[]','1688555902'),
(4,14,4,'0','subscribe',14,'[]','1688555903');

/*Table structure for table `cl_posts` */

DROP TABLE IF EXISTS `cl_posts`;

CREATE TABLE `cl_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `publication_id` int(11) NOT NULL DEFAULT '0',
  `type` enum('post','repost') NOT NULL DEFAULT 'post',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `cl_posts` */

insert  into `cl_posts`(`id`,`user_id`,`publication_id`,`type`,`time`) values 
(1,14,1,'post','1688559286'),
(2,14,2,'post','1688559352'),
(3,14,3,'post','1688559425');

/*Table structure for table `cl_profile_reports` */

DROP TABLE IF EXISTS `cl_profile_reports`;

CREATE TABLE `cl_profile_reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `profile_id` int(11) NOT NULL DEFAULT '0',
  `reason` int(3) NOT NULL DEFAULT '0',
  `comment` varchar(3000) NOT NULL DEFAULT '',
  `seen` enum('0','1') NOT NULL DEFAULT '0',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_profile_reports` */

/*Table structure for table `cl_pub_reports` */

DROP TABLE IF EXISTS `cl_pub_reports`;

CREATE TABLE `cl_pub_reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `post_id` int(11) NOT NULL DEFAULT '0',
  `reason` varchar(3) NOT NULL DEFAULT '0',
  `seen` enum('0','1') NOT NULL DEFAULT '0',
  `comment` varchar(1210) NOT NULL DEFAULT '',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_pub_reports` */

/*Table structure for table `cl_publications` */

DROP TABLE IF EXISTS `cl_publications`;

CREATE TABLE `cl_publications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `text` text CHARACTER SET utf8mb4,
  `type` enum('text','video','image','gif','poll','audio','document') NOT NULL DEFAULT 'text',
  `replys_count` int(11) NOT NULL DEFAULT '0',
  `reposts_count` int(11) NOT NULL DEFAULT '0',
  `likes_count` int(11) NOT NULL DEFAULT '0',
  `status` enum('active','inactive','deleted','orphan') NOT NULL DEFAULT 'active',
  `thread_id` int(11) NOT NULL DEFAULT '0',
  `target` enum('publication','pub_reply') NOT NULL DEFAULT 'publication',
  `og_data` varchar(3000) CHARACTER SET utf8mb4 DEFAULT '',
  `poll_data` text,
  `priv_wcs` enum('everyone','followers') NOT NULL DEFAULT 'everyone',
  `priv_wcr` enum('everyone','followers','mentioned') NOT NULL DEFAULT 'everyone',
  `time` varchar(25) NOT NULL DEFAULT '0',
  `edited` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `cl_publications` */

insert  into `cl_publications`(`id`,`user_id`,`text`,`type`,`replys_count`,`reposts_count`,`likes_count`,`status`,`thread_id`,`target`,`og_data`,`poll_data`,`priv_wcs`,`priv_wcr`,`time`,`edited`) values 
(1,14,'','image',0,0,0,'active',0,'publication','',NULL,'everyone','everyone','1688559286','0'),
(2,14,'','image',0,0,0,'active',0,'publication','',NULL,'everyone','everyone','1688559352','0'),
(3,14,'','image',0,0,0,'active',0,'publication','',NULL,'everyone','everyone','1688559425','0');

/*Table structure for table `cl_publikes` */

DROP TABLE IF EXISTS `cl_publikes`;

CREATE TABLE `cl_publikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pub_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_publikes` */

/*Table structure for table `cl_pubmedia` */

DROP TABLE IF EXISTS `cl_pubmedia`;

CREATE TABLE `cl_pubmedia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pub_id` int(11) NOT NULL DEFAULT '0',
  `type` enum('image','video','gif','audio','document') NOT NULL,
  `src` varchar(1200) NOT NULL DEFAULT '',
  `json_data` varchar(3000) NOT NULL DEFAULT '[]',
  `time` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `cl_pubmedia` */

insert  into `cl_pubmedia`(`id`,`pub_id`,`type`,`src`,`json_data`,`time`) values 
(1,1,'image','upload/images/2023/07/f14LJqrX5DhKdpAnCs5e_05_a9d268f1e0757e59194d689c08c60702_image_original.jpg','{\n    \"image_thumb\": \"upload\\/images\\/2023\\/07\\/tZOpQDLMTvbRLus7aQl4_05_a9d268f1e0757e59194d689c08c60702_image_300x300.jpg\"\n}','1688559275'),
(2,2,'image','upload/images/2023/07/N7Q5PDLxIrfMZMfNIoo6_05_03beb82f516fba3c3ec7771db5c1cd60_image_original.jpg','{\n    \"image_thumb\": \"upload\\/images\\/2023\\/07\\/zlDnYirliAahBtjLCWhs_05_03beb82f516fba3c3ec7771db5c1cd60_image_300x300.jpg\"\n}','1688559348'),
(3,3,'image','upload/images/2023/07/de81qkOrAXLIZetRWe2p_05_b43bf40bed791035641430be056dac61_image_original.jpg','{\n    \"image_thumb\": \"upload\\/images\\/2023\\/07\\/QvbscgV1Sv2Zik7P3I8d_05_b43bf40bed791035641430be056dac61_image_300x300.jpg\"\n}','1688559422');

/*Table structure for table `cl_sessions` */

DROP TABLE IF EXISTS `cl_sessions`;

CREATE TABLE `cl_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(120) NOT NULL DEFAULT '',
  `user_id` varchar(11) NOT NULL DEFAULT '0',
  `platform` varchar(15) NOT NULL DEFAULT 'web',
  `time` varchar(25) NOT NULL DEFAULT '0',
  `lifespan` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

/*Data for the table `cl_sessions` */

insert  into `cl_sessions`(`id`,`session_id`,`user_id`,`platform`,`time`,`lifespan`) values 
(6,'4d6a82f1c18173f9e204d80cdbc037d9c1e21f2d168853462848c928f8075a4f49d49b92d9bf8b0f0f','5','web','1688534628','1720157028'),
(7,'0e17dafd266190e3e84f6b9c6467bf2d1e8672e51688534931eb78c692dd9b492cf6cf94ded3b4b384','6','web','1688534931','1720157331'),
(8,'baa222cafc685c7f72e0625db229c1c678b2b9c01688535006b9758416001cca569f2a8d0bde79612c','7','web','1688535006','1720157406'),
(11,'443000a76ae423240f9ba3209114016eb3d7c2e61688535551d33af2d2318959d3a6f2468ef3fe77dc','10','web','1688535551','1720157951'),
(25,'302ab96074ef7b85d5a0f474c7eafe7fbb21335816886322735ae7377e2110134d34d9d3e92d9126c8','17','web','1688632273','1720254673'),
(40,'a2af190c7f4a7261b8a50d7e7fc2e6180d1533cb16886374931cb1ef90e61f9fe50d19b568c6dc715a','29','web','1688637493','1720259893');

/*Table structure for table `cl_ui_langs` */

DROP TABLE IF EXISTS `cl_ui_langs`;

CREATE TABLE `cl_ui_langs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(65) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `slug` varchar(25) NOT NULL DEFAULT '',
  `status` set('1','0') NOT NULL DEFAULT '1',
  `is_rtl` set('Y','N') NOT NULL DEFAULT 'N',
  `is_native` set('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `cl_ui_langs` */

insert  into `cl_ui_langs`(`id`,`name`,`slug`,`status`,`is_rtl`,`is_native`) values 
(1,'English','english','1','N','1'),
(2,'French','french','1','N','1'),
(3,'German','german','1','N','1'),
(4,'Italian','italian','1','N','1'),
(5,'Russian','russian','1','N','1'),
(6,'Portuguese','portuguese','1','N','1'),
(7,'Spanish','spanish','1','N','1'),
(8,'Turkish','turkish','1','N','1'),
(9,'Dutch','dutch','1','N','1'),
(10,'Ukraine','ukraine','1','N','1'),
(11,'Arabic','arabic','1','Y','1');

/*Table structure for table `cl_users` */

DROP TABLE IF EXISTS `cl_users`;

CREATE TABLE `cl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `fname` varchar(30) NOT NULL DEFAULT '',
  `lname` varchar(30) NOT NULL DEFAULT '',
  `about` varchar(600) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `gender` enum('M','F','T','O') NOT NULL DEFAULT 'M',
  `email` varchar(60) NOT NULL DEFAULT '',
  `em_code` varchar(100) NOT NULL DEFAULT '',
  `email_conf_code` varchar(120) NOT NULL DEFAULT '0',
  `password` varchar(140) NOT NULL DEFAULT '',
  `joined` varchar(20) NOT NULL DEFAULT '0',
  `logged_in_with` varchar(25) CHARACTER SET utf8mb4 NOT NULL DEFAULT 'system',
  `start_up` varchar(600) NOT NULL DEFAULT 'done',
  `last_active` varchar(20) NOT NULL DEFAULT '0',
  `ip_address` varchar(140) NOT NULL DEFAULT '0.0.0.0',
  `language` varchar(32) NOT NULL DEFAULT 'default',
  `avatar` varchar(300) NOT NULL DEFAULT 'upload/default/avatar-1.png',
  `cover` varchar(300) NOT NULL DEFAULT 'upload/default/cover-1.png',
  `cover_orig` varchar(300) NOT NULL DEFAULT 'upload/default/cover-1.png',
  `active` enum('0','1','2') NOT NULL DEFAULT '0',
  `verified` enum('0','1','2') NOT NULL DEFAULT '0',
  `admin` enum('0','1') NOT NULL DEFAULT '0',
  `posts` int(11) NOT NULL DEFAULT '0',
  `followers` int(11) NOT NULL DEFAULT '0',
  `following` int(11) NOT NULL DEFAULT '0',
  `website` varchar(120) NOT NULL DEFAULT '',
  `country_id` int(3) NOT NULL DEFAULT '1',
  `city` varchar(30) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `last_post` int(11) NOT NULL DEFAULT '0',
  `last_swift` varchar(135) NOT NULL DEFAULT '',
  `last_ad` int(11) NOT NULL DEFAULT '0',
  `profile_privacy` enum('everyone','followers') NOT NULL DEFAULT 'everyone',
  `follow_privacy` enum('everyone','approved') NOT NULL DEFAULT 'everyone',
  `contact_privacy` enum('everyone','followed') NOT NULL DEFAULT 'everyone',
  `index_privacy` enum('Y','N') NOT NULL DEFAULT 'Y',
  `aff_bonuses` int(11) NOT NULL DEFAULT '0',
  `wallet` varchar(25) NOT NULL DEFAULT '0.00',
  `pnotif_token` varchar(600) NOT NULL DEFAULT '{"token": "","type": "android"}',
  `refresh_token` varchar(220) NOT NULL DEFAULT '0',
  `settings` varchar(3000) NOT NULL DEFAULT '{"notifs":{"like":1,"subscribe":1,"subscribe_request":1,"subscribe_accept":1,"reply":1,"repost":1,"mention":1},"enotifs":{"like":0,"subscribe":0,"subscribe_request":0,"subscribe_accept":0,"reply":0,"repost":0,"mention":0}}',
  `display_settings` varchar(1200) NOT NULL DEFAULT '{"color_scheme": "default","background": "default"}',
  `swift` text CHARACTER SET utf8mb4,
  `swift_update` varchar(25) NOT NULL DEFAULT '0',
  `info_file` varchar(300) NOT NULL DEFAULT '',
  `is_premium` enum('0','1') CHARACTER SET utf8mb4 NOT NULL DEFAULT '0',
  `premium_settings` varchar(3000) CHARACTER SET utf8mb4 NOT NULL DEFAULT '{"disable_native_ads": 0,"disable_adsense_ads": 0}',
  `premium_ex_date` varchar(25) CHARACTER SET utf8mb4 NOT NULL DEFAULT '0',
  `wallet_address` varchar(255) DEFAULT NULL,
  `balance` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts` (`posts`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `cl_users` */

insert  into `cl_users`(`id`,`username`,`fname`,`lname`,`about`,`gender`,`email`,`em_code`,`email_conf_code`,`password`,`joined`,`logged_in_with`,`start_up`,`last_active`,`ip_address`,`language`,`avatar`,`cover`,`cover_orig`,`active`,`verified`,`admin`,`posts`,`followers`,`following`,`website`,`country_id`,`city`,`last_post`,`last_swift`,`last_ad`,`profile_privacy`,`follow_privacy`,`contact_privacy`,`index_privacy`,`aff_bonuses`,`wallet`,`pnotif_token`,`refresh_token`,`settings`,`display_settings`,`swift`,`swift_update`,`info_file`,`is_premium`,`premium_settings`,`premium_ex_date`,`wallet_address`,`balance`) values 
(1,'administrator','Site','Admin','','M','topcoder728@gmail.com','','0','$2y$10$rxcDOIE27uLcLZNrF3vJReHpf7qfaTGK1DN1bj7T9POZlxhwJripG','1688484024','system','done','1688559250','::1','english','upload/default/avatar-1.png','upload/default/cover-1.png','upload/default/cover-1.png','1','1','1',0,0,0,'',1,'',0,'',0,'everyone','everyone','everyone','Y',0,'0.00','{\"token\": \"\",\"type\": \"android\"}','0','{\"notifs\":{\"like\":1,\"subscribe\":1,\"subscribe_request\":1,\"subscribe_accept\":1,\"reply\":1,\"repost\":1,\"mention\":1},\"enotifs\":{\"like\":0,\"subscribe\":0,\"subscribe_request\":0,\"subscribe_accept\":0,\"reply\":0,\"repost\":0,\"mention\":0}}','{\"color_scheme\": \"default\",\"background\": \"default\"}',NULL,'0','','0','{\"disable_native_ads\": 0,\"disable_adsense_ads\": 0}','0','',NULL),
(28,'0x6abf...db8c642','0x6abf...db8c642','','','M','','de10cfe71807553ccdcc707da7278da6f3568746','0','$2y$10$6m3wloU3geMY6V.CHKH5oeb9YlLN9NCbb0yfIM7d27FVMOIm8tZFm','1688635021','system','{\n    \"source\": \"system\",\n    \"avatar\": 0,\n    \"info\": 0,\n    \"follow\": 0\n}','1688637414','::1','english','upload/default/avatar-8.png','upload/default/cover-8.png','upload/default/cover-8.png','1','0','0',0,0,0,'',1,'',0,'',0,'everyone','everyone','everyone','Y',0,'0.00','{\"token\": \"\",\"type\": \"android\"}','0','{\"notifs\":{\"like\":1,\"subscribe\":1,\"subscribe_request\":1,\"subscribe_accept\":1,\"reply\":1,\"repost\":1,\"mention\":1},\"enotifs\":{\"like\":0,\"subscribe\":0,\"subscribe_request\":0,\"subscribe_accept\":0,\"reply\":0,\"repost\":0,\"mention\":0}}','{\n    \"color_scheme\": \"default\",\n    \"background\": \"default\"\n}',NULL,'0','','0','{\"disable_native_ads\": 0,\"disable_adsense_ads\": 0}','0','0x6abfd5d17af6adb6099510ddf48d80578db8c642','0.0'),
(29,'0x6424...7599fa7','0x6424...7599fa7','','','M','test@gmail.com','2851cbe7bc230375f56fa78094ad8b6df3333fa2','0','$2y$10$l.q6ASSAqIAliSiQe54Q9e3ps0T32NaYm/XB3YsULrlQLTzTiUIjS','1688637433','system','{\n    \"source\": \"system\",\n    \"avatar\": 0,\n    \"info\": 0,\n    \"follow\": 0\n}','1688637672','::1','english','upload/default/avatar-5.png','upload/default/cover-5.png','upload/default/cover-5.png','1','0','0',0,0,0,'',1,'',0,'',0,'everyone','everyone','everyone','Y',0,'0.00','{\"token\": \"\",\"type\": \"android\"}','0','{\"notifs\":{\"like\":1,\"subscribe\":1,\"subscribe_request\":1,\"subscribe_accept\":1,\"reply\":1,\"repost\":1,\"mention\":1},\"enotifs\":{\"like\":0,\"subscribe\":0,\"subscribe_request\":0,\"subscribe_accept\":0,\"reply\":0,\"repost\":0,\"mention\":0}}','{\n    \"color_scheme\": \"default\",\n    \"background\": \"default\"\n}',NULL,'0','','0','{\"disable_native_ads\": 0,\"disable_adsense_ads\": 0}','0','0x6424e502f50268d1c6b9ef6a30ac4a0677599fa7','0.0');

/*Table structure for table `cl_verifications` */

DROP TABLE IF EXISTS `cl_verifications`;

CREATE TABLE `cl_verifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `full_name` varchar(120) NOT NULL DEFAULT '',
  `text_message` varchar(1200) NOT NULL DEFAULT '',
  `video_message` varchar(300) NOT NULL DEFAULT '',
  `time` int(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_verifications` */

/*Table structure for table `cl_wallet_history` */

DROP TABLE IF EXISTS `cl_wallet_history`;

CREATE TABLE `cl_wallet_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `operation` varchar(60) NOT NULL DEFAULT '',
  `amount` varchar(25) NOT NULL DEFAULT '0.00',
  `json_data` varchar(3000) NOT NULL DEFAULT '[]',
  `time` varchar(25) NOT NULL DEFAULT '0',
  `status` varchar(25) CHARACTER SET utf8mb4 NOT NULL DEFAULT 'success',
  `trans_id` varchar(130) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cl_wallet_history` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
