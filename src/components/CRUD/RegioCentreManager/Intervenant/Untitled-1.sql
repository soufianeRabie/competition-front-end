


DROP TABLE IF EXISTS `actions`;
CREATE TABLE `actions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `exercice` int DEFAULT NULL,
  `entreprises_id` bigint unsigned NOT NULL,
  `themes_id` bigint unsigned NOT NULL,
  `Intervenants_id` bigint unsigned NOT NULL,
  `etablissements_id` bigint unsigned NOT NULL,
  `date_debut_prev` datetime DEFAULT NULL,
  `date_fin_prev` datetime DEFAULT NULL,
  `prix_reel` float DEFAULT NULL,
  `date_fin_real` datetime DEFAULT NULL,
  `date_debut_real` datetime DEFAULT NULL,
  `nbparticipants` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_actions_themes1_idx` (`themes_id`),
  KEY `fk_actions_entreprises1_idx` (`entreprises_id`),
  KEY `fk_actions_etablissements1_idx` (`etablissements_id`),
  KEY `fk_actions_Intervenants1_idx` (`Intervenants_id`),
  CONSTRAINT `fk_actions_entreprises1` FOREIGN KEY (`entreprises_id`) REFERENCES `entreprises` (`id`),
  CONSTRAINT `fk_actions_etablissements1` FOREIGN KEY (`etablissements_id`) REFERENCES `etablissements` (`id`),
  CONSTRAINT `fk_actions_Intervenants1` FOREIGN KEY (`Intervenants_id`) REFERENCES `intervenants` (`id`),
  CONSTRAINT `fk_actions_themes1` FOREIGN KEY (`themes_id`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;


LOCK TABLES `actions` WRITE;
INSERT INTO `actions` VALUES (7,2023,5,1,1,47,'2024-02-13 18:03:24','2024-02-13 18:03:24',1500,'2024-02-13 18:03:24','2024-02-13 18:03:24',30,1,'2024-02-13 18:03:24','2024-02-13 18:03:24'),(8,2023,6,2,2,46,'2024-02-13 18:03:24','2024-02-13 18:03:24',2000,'2024-02-13 18:03:24','2024-02-13 18:03:24',25,1,'2024-02-13 18:03:24','2024-02-13 18:03:24');
UNLOCK TABLES;


DROP TABLE IF EXISTS `certifications`;
CREATE TABLE `certifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `domaines_id` bigint unsigned NOT NULL,
  `Intervenants_id` bigint unsigned NOT NULL,
  `intiltule_certification` varchar(45) DEFAULT NULL,
  `organisme_certification` varchar(45) DEFAULT NULL,
  `type_certification` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_certifications_domaines1_idx` (`domaines_id`),
  KEY `fk_certifications_Intervenants1_idx` (`Intervenants_id`),
  CONSTRAINT `fk_certifications_domaines1` FOREIGN KEY (`domaines_id`) REFERENCES `domaines` (`id`),
  CONSTRAINT `fk_certifications_Intervenants1` FOREIGN KEY (`Intervenants_id`) REFERENCES `intervenants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;


LOCK TABLES `certifications` WRITE;
INSERT INTO `certifications` VALUES (2,2,2,'cerjjjjjjjjjjjjjjjjjjjj','ww','w','2024-05-23 11:04:08','2024-05-23 11:04:42');
UNLOCK TABLES;


DROP TABLE IF EXISTS `competences`;
CREATE TABLE `competences` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `intervenant_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `competences_intervenant_id_foreign` (`intervenant_id`),
  CONSTRAINT `competences_intervenant_id_foreign` FOREIGN KEY (`intervenant_id`) REFERENCES `intervenants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `competences` WRITE;
INSERT INTO `competences` VALUES (2,1,'carot','eeeeeeeeejjjjjjjjjjjj','2024-05-23 10:30:59','2024-05-23 11:00:45');
UNLOCK TABLES;


DROP TABLE IF EXISTS `domaines`;
CREATE TABLE `domaines` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom_domaine` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `domaines` WRITE;
INSERT INTO `domaines` VALUES (1,'new domain',1,NULL,NULL),(2,'old domain',2,NULL,NULL);
UNLOCK TABLES;


DROP TABLE IF EXISTS `entreprises`;
CREATE TABLE `entreprises` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `raison` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `site` varchar(100) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  `representant` varchar(100) DEFAULT NULL,
  `telephone1` varchar(45) DEFAULT NULL,
  `telephone2` varchar(45) DEFAULT NULL,
  `telephone3` varchar(45) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entreprises_user_id_foreign` (`user_id`),
  CONSTRAINT `fk_entreprises_users2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;


LOCK TABLES `entreprises` WRITE;
INSERT INTO `entreprises` VALUES (5,4,'Example Company 1','company1@example.com','http://www.company1.com','company1_logo.png',1,'2024-05-21 16:58:38',NULL,'John Doe','123-456-7890','456-789-0123','789-012-3456',NULL),(6,5,'Example Company 2','company2@example.com','http://www.company2.com','company2_logo.png',1,'2024-05-21 16:58:38',NULL,'Jane Smith','987-654-3210','654-321-0987','321-098-7654',NULL),(7,4,'Example Company 1','company1@example.com','http://www.company1.com','company1_logo.png',1,'2024-05-21 17:02:42',NULL,'John Doe','123-456-7890','456-789-0123','789-012-3456',NULL),(8,5,'Example Company 2','company2@example.com','http://www.company2.com','company2_logo.png',1,'2024-05-21 17:02:42',NULL,'Jane Smith','987-654-3210','654-321-0987','321-098-7654',NULL),(15,15,'dddddddd','rabyasoufiane@gmail.com','dddddd','dddddddd',1,'2024-05-22 17:35:59',NULL,'ddddddddd','3333333333','333333333333','3333333333333','2024-05-22 17:36:33');
UNLOCK TABLES;


DROP TABLE IF EXISTS `etablissements`;
CREATE TABLE `etablissements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `users_id` bigint unsigned DEFAULT NULL,
  `regions_id` bigint NOT NULL,
  `nom_efp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ville` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `etablissements_nom_unique` (`nom_efp`),
  KEY `fk_etablissements_regions1_idx` (`regions_id`),
  CONSTRAINT `fk_etablissements_regions1` FOREIGN KEY (`regions_id`) REFERENCES `regions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `etablissements` WRITE;
INSERT INTO `etablissements` VALUES (46,1,1,'Etablissement A','123 Rue Principale','0123456789','Ville A','Actif','2024-05-21 14:46:21','2024-05-21 14:46:21'),(47,2,2,'Etablissement B','456 Avenue Secondaire','0987654321','Ville B','Inactif','2024-05-21 14:46:21','2024-05-21 14:46:21');
UNLOCK TABLES;


DROP TABLE IF EXISTS `intervenants`;
CREATE TABLE `intervenants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `etablissements_id` bigint unsigned DEFAULT NULL,
  `users_id` bigint unsigned DEFAULT NULL,
  `matricule` varchar(45) DEFAULT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `datenaissance` varchar(45) DEFAULT NULL,
  `intitule_diplome` varchar(45) DEFAULT NULL,
  `type_diplome` varchar(45) DEFAULT NULL,
  `specialite_diplome` varchar(45) DEFAULT NULL,
  `type_intervenant` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;


LOCK TABLES `intervenants` WRITE;
INSERT INTO `intervenants` VALUES (1,46,3,'2','Soufiane',NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-21 15:48:01','2024-05-21 15:48:01'),(2,NULL,NULL,'2','Soufiane',NULL,NULL,NULL,'h',4,NULL,'2024-05-21 16:21:20','2024-05-21 16:21:20'),(3,NULL,NULL,'2','Soufiane',NULL,NULL,NULL,'h',4,NULL,'2024-05-21 16:21:21','2024-05-21 16:21:21'),(4,47,NULL,'ddd','Soufiane',NULL,'ddd','ddddddddd','dddddddddd',66,NULL,'2024-05-21 16:23:29','2024-05-21 16:23:29'),(5,46,NULL,'2','Soufiane',NULL,'ree','727','dddddddddd',383,NULL,'2024-05-21 16:35:10','2024-05-21 16:35:10'),(6,46,NULL,'ddd','Soufiane',NULL,'ssssssssss','fffffffffffff','gggggggggg',383,NULL,'2024-05-22 17:49:43','2024-05-22 17:49:43'),(9,47,6,'111','MOHAMMED AMINE ELKESS','2024-05-24','LOT 3 MARS NR 31 DEROUA BERRECHID','ddddddddd','dddddddddd',1,1,'2024-05-23 11:15:17','2024-05-23 11:15:17'),(11,47,12,'12345','MOHAMMED AMINE ELKESS','2024-05-31','int1','t1','sp1',1,1,'2024-05-23 11:18:56','2024-05-23 11:18:56'),(12,47,12,'12345','jilali','2024-05-31','int1','t1','sp1',1,1,'2024-05-23 11:21:14','2024-05-23 11:21:14'),(13,47,12,'12345','jilali','2024-05-31','int1','t1','sp1',1,1,'2024-05-23 11:22:46','2024-05-23 11:22:46');
UNLOCK TABLES;


DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `migrations` WRITE;
INSERT INTO `migrations` VALUES (1,'2019_12_14_000001_create_personal_access_tokens_table',1),(2,'2024_05_21_135823_add_prenom_and_nom_to_users_table',2),(5,'2024_05_22_131353_create_profils_table',3),(6,'2024_05_23_102907_create_competences_table',4);
UNLOCK TABLES;


DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `model_has_roles` WRITE;
UNLOCK TABLES;


DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `personal_access_tokens` WRITE;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',4,'TOKEN_NAME','cc1600667079828aa32fec0e115d677cd472ec8858b76a11aa3b41300995ba9a','[\"*\"]',NULL,'2025-05-21 13:24:19','2024-05-21 13:24:19','2024-05-21 13:24:19'),(2,'App\\Models\\User',4,'TOKEN_NAME','cdc5ee25db8166fad6899610c35708ac33695cbb17ad10432a66a53d82f29f0c','[\"*\"]',NULL,'2025-05-21 13:26:24','2024-05-21 13:26:24','2024-05-21 13:26:24'),(3,'App\\Models\\User',4,'TOKEN_NAME','8d39507921fbebb0c37eac44a8dc63313c2b28d41e6fb84a91130f78992d33ad','[\"*\"]',NULL,'2025-05-21 13:28:03','2024-05-21 13:28:03','2024-05-21 13:28:03'),(4,'App\\Models\\User',4,'TOKEN_NAME','a91aa43082564b394b6115aed90ad4ec247b540010cc6660e3275a55603da00f','[\"*\"]',NULL,'2025-05-21 13:28:30','2024-05-21 13:28:30','2024-05-21 13:28:30'),(5,'App\\Models\\User',4,'TOKEN_NAME','2fff35e8e6983c539894b7d7ee3176a931402292869ead53e2c541f942e3f3a2','[\"*\"]',NULL,'2025-05-21 13:29:27','2024-05-21 13:29:27','2024-05-21 13:29:27'),(6,'App\\Models\\User',4,'TOKEN_NAME','24a2774af18f5e7d910540b5bdfc4cab43545c19e3eb37947f02030c07cf1a71','[\"*\"]',NULL,'2025-05-21 13:29:51','2024-05-21 13:29:51','2024-05-21 13:29:51'),(7,'App\\Models\\User',4,'TOKEN_NAME','6e3d6708b52b34ae8528afcda2590088b860db9216e1e90a6743eb796a4ae9b5','[\"*\"]',NULL,'2025-05-21 13:30:15','2024-05-21 13:30:15','2024-05-21 13:30:15'),(8,'App\\Models\\User',4,'TOKEN_NAME','ff204b186aee721cf426cae8743dfccd00ff7e7258da59a087d656130809c775','[\"*\"]',NULL,'2025-05-21 13:30:32','2024-05-21 13:30:32','2024-05-21 13:30:32'),(9,'App\\Models\\User',4,'TOKEN_NAME','e875199e76256fc21b93e75edf5dd397374f8ac7b65808e6b75e44f0c8423f20','[\"*\"]',NULL,'2025-05-21 14:09:46','2024-05-21 14:09:47','2024-05-21 14:09:47'),(10,'App\\Models\\User',4,'TOKEN_NAME','dc0cae4991262d6bdd196d51c32228ea842b690ab87ba3753c61baa441b05f07','[\"*\"]','2024-05-21 15:13:28','2025-05-21 14:10:57','2024-05-21 14:10:57','2024-05-21 15:13:28'),(11,'App\\Models\\User',4,'TOKEN_NAME','3c59478ddafbf480493e23b5c1d5790e93efe704ffc056eb35d76d9295b4257c','[\"*\"]',NULL,'2025-05-21 17:10:51','2024-05-21 17:10:51','2024-05-21 17:10:51'),(12,'App\\Models\\User',8,'TOKEN_NAME','b4e668fcebe16b02c23be4bc1b256d68244327b882e16bc2fe21949c080ccc92','[\"*\"]',NULL,'2025-05-22 12:31:21','2024-05-22 12:31:21','2024-05-22 12:31:21'),(13,'App\\Models\\User',8,'TOKEN_NAME','778bda6e0f7fd8adf5e53fd0a9465d1d471afbdffe5b29c18a70fab6b530f752','[\"*\"]',NULL,'2025-05-22 12:32:33','2024-05-22 12:32:33','2024-05-22 12:32:33'),(14,'App\\Models\\User',8,'TOKEN_NAME','afdbb0a8a3ba5e8224e64087bc7d2061e44fc58a81f52642ef072aac54df4b19','[\"*\"]',NULL,'2025-05-22 12:32:55','2024-05-22 12:32:55','2024-05-22 12:32:55'),(15,'App\\Models\\User',8,'TOKEN_NAME','a80bdf67ebc67d5fa4da27b9d74ba6cd9aa03e59da9f879e2425bc4a76fcf83a','[\"*\"]',NULL,'2025-05-22 12:34:06','2024-05-22 12:34:06','2024-05-22 12:34:06'),(16,'App\\Models\\User',8,'TOKEN_NAME','522d2e5c2f2f12b6c580b2b5a718b9d27f4301345a6fe8658eb32fce190861cc','[\"*\"]',NULL,'2025-05-22 12:40:49','2024-05-22 12:40:49','2024-05-22 12:40:49'),(17,'App\\Models\\User',8,'TOKEN_NAME','d4d8e72a13f3f01a8603845a0552d59b7b8864f9d33a5a6cbed968530e8bf1ac','[\"*\"]',NULL,'2025-05-22 12:41:43','2024-05-22 12:41:43','2024-05-22 12:41:43'),(18,'App\\Models\\User',8,'TOKEN_NAME','3f975e0a30f951badb755b809d755f99afed7a8ae6c480caaa5f96b11d3e72bd','[\"*\"]',NULL,'2025-05-22 12:41:59','2024-05-22 12:41:59','2024-05-22 12:41:59'),(19,'App\\Models\\User',10,'TOKEN_NAME','2e92fef4f0fcdec11a4be6a8200a26047aa9ffe9784ef7f3aa125c41f153b0cb','[\"*\"]',NULL,'2025-05-22 12:44:11','2024-05-22 12:44:11','2024-05-22 12:44:11'),(20,'App\\Models\\User',12,'TOKEN_NAME','ebc0c4f15787926c33490d829a9dda1a288b3ac3c6105e27caf4f784e96bc0b9','[\"*\"]','2024-05-22 13:50:31','2025-05-22 12:57:01','2024-05-22 12:57:01','2024-05-22 13:50:31'),(21,'App\\Models\\User',13,'TOKEN_NAME','a44efa3c345cab171708c6de0ea94e2a2bd2a1b1aec5da28e6266e7216dbc1d4','[\"*\"]',NULL,'2025-05-22 13:07:29','2024-05-22 13:07:29','2024-05-22 13:07:29'),(22,'App\\Models\\User',13,'TOKEN_NAME','47541cf2e72e93138c031455ff294ecc1503b485c62d2e907916b240dd5c78ec','[\"*\"]',NULL,'2025-05-22 13:07:47','2024-05-22 13:07:47','2024-05-22 13:07:47'),(23,'App\\Models\\User',4,'TOKEN_NAME','3ddfb97d2d64143409b0f00491f0dd46b204bd974450bc3a25f2bb7e24de909c','[\"*\"]',NULL,'2025-05-22 13:55:37','2024-05-22 13:55:37','2024-05-22 13:55:37'),(24,'App\\Models\\User',4,'TOKEN_NAME','70e7a1c74add8c588605b3263b2a286d1f5ea917d06c5d9efd212558b22a87de','[\"*\"]',NULL,'2025-05-22 13:56:40','2024-05-22 13:56:40','2024-05-22 13:56:40'),(25,'App\\Models\\User',4,'TOKEN_NAME','f24099106789f11b6a50b3f8adb3caf9098720dd5ca0fa678ea640d406aafc96','[\"*\"]',NULL,'2025-05-22 13:58:24','2024-05-22 13:58:24','2024-05-22 13:58:24'),(26,'App\\Models\\User',4,'TOKEN_NAME','ccae4948c3b93d9e18fdad5b73e32d9412ee4cbc134efaec1cfc407bf2ed3c18','[\"*\"]',NULL,'2025-05-22 14:05:40','2024-05-22 14:05:40','2024-05-22 14:05:40'),(27,'App\\Models\\User',4,'TOKEN_NAME','3ef633fda9b1ed0c2777c910d3b66253a8396525e41c8b553c77f3b3aa715965','[\"*\"]',NULL,'2025-05-22 14:06:25','2024-05-22 14:06:25','2024-05-22 14:06:25'),(28,'App\\Models\\User',4,'TOKEN_NAME','dfb015b41e78d373c6311e7bb57682436eb3c12e948641b8839b48fb28fdc3f1','[\"*\"]','2024-05-22 14:07:23','2025-05-22 14:07:07','2024-05-22 14:07:07','2024-05-22 14:07:23'),(29,'App\\Models\\User',4,'TOKEN_NAME','ce1726a8b2ba8a4858d8840863669389274c005097521cc375014170d61c955f','[\"*\"]','2024-05-22 14:09:12','2025-05-22 14:08:12','2024-05-22 14:08:12','2024-05-22 14:09:12'),(30,'App\\Models\\User',4,'TOKEN_NAME','98cb43743789560b5b6ff0049bfb44447523cb194c0c0a73e5449d1b1bf643ab','[\"*\"]','2024-05-22 14:14:58','2025-05-22 14:09:42','2024-05-22 14:09:42','2024-05-22 14:14:58'),(31,'App\\Models\\User',4,'TOKEN_NAME','1d1f3b2ea32ab15d63442c2a634211de2e8aa102286f9b20395ca06ae1ba4a04','[\"*\"]','2024-05-22 14:16:00','2025-05-22 14:15:46','2024-05-22 14:15:46','2024-05-22 14:16:00'),(32,'App\\Models\\User',4,'TOKEN_NAME','07e2f4fd7146ab7b7b894d2c73e1b8e11f5cab0e9b8586008e7081deefe42128','[\"*\"]','2024-05-22 14:21:53','2025-05-22 14:17:24','2024-05-22 14:17:24','2024-05-22 14:21:53'),(33,'App\\Models\\User',4,'TOKEN_NAME','58f47930193fe4f60dedc33b36493dffd93cc133a1e936ab89fe36df781689be','[\"*\"]','2024-05-22 14:38:02','2025-05-22 14:22:11','2024-05-22 14:22:11','2024-05-22 14:38:02'),(34,'App\\Models\\User',14,'TOKEN_NAME','7a124ad9b09d0d26a64cb7b2a05036e1e1530bfa37d0b0a6ee0294620289ee01','[\"*\"]',NULL,'2025-05-22 14:47:01','2024-05-22 14:47:01','2024-05-22 14:47:01'),(35,'App\\Models\\User',14,'TOKEN_NAME','28a1f127856ef1ec92b4a592519b0eac98ff54b5974820ff0a6df3f655f10725','[\"*\"]','2024-05-22 15:09:33','2025-05-22 14:48:33','2024-05-22 14:48:33','2024-05-22 15:09:33'),(36,'App\\Models\\User',4,'TOKEN_NAME','25b7a6e5e7ebc552856163e35b385a9acd5a1df7b5ebd8c71e8b130b08f80864','[\"*\"]','2024-05-22 16:01:33','2025-05-22 15:09:56','2024-05-22 15:09:56','2024-05-22 16:01:33'),(37,'App\\Models\\User',8,'TOKEN_NAME','447095d76a9a66dca4ea4447295974daaeb88982d5ddbdac6bb18a8df0f9db73','[\"*\"]','2024-05-22 16:06:49','2025-05-22 16:02:46','2024-05-22 16:02:46','2024-05-22 16:06:49'),(38,'App\\Models\\User',4,'TOKEN_NAME','e87cee748323bd128cc0cb480256cfe076cd001571a98937cf8521bbff1d182d','[\"*\"]','2024-05-22 16:14:11','2025-05-22 16:11:59','2024-05-22 16:11:59','2024-05-22 16:14:11'),(39,'App\\Models\\User',4,'TOKEN_NAME','dbdda62c9e9545806062a8920ca654485079ef64473e549115feaef63100f455','[\"*\"]','2024-05-22 16:41:37','2025-05-22 16:14:32','2024-05-22 16:14:32','2024-05-22 16:41:37'),(40,'App\\Models\\User',4,'TOKEN_NAME','5223ba5e1ad7ed8ce8b92c7b8cb3c7ff31d7c1c30d22bccb66d6960f9be48af3','[\"*\"]',NULL,'2025-05-22 16:54:00','2024-05-22 16:54:00','2024-05-22 16:54:00'),(41,'App\\Models\\User',15,'TOKEN_NAME','dba739f76bffd6ac07679d8a1a7e65b9061c67ad9af4a94540fb19a8eacae17d','[\"*\"]',NULL,'2025-05-22 16:55:51','2024-05-22 16:55:51','2024-05-22 16:55:51'),(42,'App\\Models\\User',15,'TOKEN_NAME','e8ccb522bf32cc669da9c86e2ffa3a90d49ff0e7b8737a18e9bc7ccff72eb160','[\"*\"]',NULL,'2025-05-22 16:57:02','2024-05-22 16:57:02','2024-05-22 16:57:02'),(43,'App\\Models\\User',15,'TOKEN_NAME','9edcbdf69ceff14388f869a441b3d2ae4ab3995388aa72b5e36432a09190a543','[\"*\"]',NULL,'2025-05-22 16:58:25','2024-05-22 16:58:25','2024-05-22 16:58:25'),(44,'App\\Models\\User',15,'TOKEN_NAME','3b6690b95a6ff0ee3b3cdbcb02df6fd4337627eeb69f8cbfc47a6fe32378d0b4','[\"*\"]','2024-05-22 17:46:53','2025-05-22 17:00:57','2024-05-22 17:00:57','2024-05-22 17:46:53'),(45,'App\\Models\\User',14,'TOKEN_NAME','53838e2c30c8fedbb29696e8d89773eb742199443650baec8f807efcea216dcc','[\"*\"]','2024-05-22 19:11:58','2025-05-22 17:47:07','2024-05-22 17:47:07','2024-05-22 19:11:58'),(46,'App\\Models\\User',16,'TOKEN_NAME','e8e95d6993f21fc40702b8fd1e572c3a3f32789d5e9d703aebbbc62d8df13804','[\"*\"]','2024-05-23 11:16:18','2025-05-23 10:09:51','2024-05-23 10:09:52','2024-05-23 11:16:18');
UNLOCK TABLES;


DROP TABLE IF EXISTS `plans`;
CREATE TABLE `plans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `exercice` int DEFAULT NULL,
  `etablissements_id` bigint unsigned NOT NULL,
  `themes_id` bigint unsigned NOT NULL,
  `nbjours` int DEFAULT NULL,
  `nbparticipantmaxi` int DEFAULT NULL,
  `cout_previsionnel` float DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_plans_themes1_idx` (`themes_id`),
  KEY `fk_plans_etablissements1_idx` (`etablissements_id`),
  CONSTRAINT `fk_plans_etablissements1` FOREIGN KEY (`etablissements_id`) REFERENCES `etablissements` (`id`),
  CONSTRAINT `fk_plans_themes1` FOREIGN KEY (`themes_id`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


LOCK TABLES `plans` WRITE;
UNLOCK TABLES;


DROP TABLE IF EXISTS `profils`;
CREATE TABLE `profils` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `prenom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_de_naissance` date DEFAULT NULL,
  `genre` enum('male','female') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profils_user_id_foreign` (`user_id`),
  CONSTRAINT `profils_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `profils` WRITE;
INSERT INTO `profils` VALUES (1,15,NULL,NULL,NULL,'male',NULL,NULL,'2024-05-22 16:55:50','2024-05-22 16:55:50'),(2,16,NULL,NULL,NULL,'male',NULL,NULL,'2024-05-23 10:09:51','2024-05-23 10:09:51');
UNLOCK TABLES;


DROP TABLE IF EXISTS `regions`;
CREATE TABLE `regions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `users_id` bigint unsigned DEFAULT NULL,
  `nom_region` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;


LOCK TABLES `regions` WRITE;
INSERT INTO `regions` VALUES (1,1,'CASA SETTAT','2024-05-21 05:58:47','2024-05-21 05:58:47'),(2,1,'RABAT SALE','2024-05-21 05:59:37','2024-05-21 05:59:37'),(3,2,'TANGER TETOUAN ALHOUCEIMA','2024-05-21 06:00:28','2024-05-21 06:00:28'),(4,1,'Région A','2024-05-21 14:46:00','2024-05-21 14:46:00'),(5,2,'Région B','2024-05-21 14:46:00','2024-05-21 14:46:00');
UNLOCK TABLES;


DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `roles` WRITE;
INSERT INTO `roles` VALUES (4,'central','intern','2024-05-21 13:12:39','2024-05-21 13:12:39'),(5,'regional','intern','2024-05-21 13:12:39','2024-05-21 13:12:39'),(6,'entreprise','extern','2024-05-21 13:12:39','2024-05-21 13:12:39'),(7,'local','intern','2024-05-21 13:12:39','2024-05-21 13:12:39'),(8,'intervenant','intern','2024-05-21 13:12:39','2024-05-21 13:12:39');
UNLOCK TABLES;


DROP TABLE IF EXISTS `themes`;
CREATE TABLE `themes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `domaines_id` bigint unsigned NOT NULL,
  `intitule_theme` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duree_formation` int DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_themes_domaines1_idx` (`domaines_id`),
  CONSTRAINT `fk_themes_domaines1` FOREIGN KEY (`domaines_id`) REFERENCES `domaines` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `themes` WRITE;
INSERT INTO `themes` VALUES (1,1,'Theme 1',10,1,'2024-05-21 17:02:19','2024-05-21 17:02:19'),(2,2,'Theme 2',15,1,'2024-05-21 17:02:19','2024-05-21 17:02:19');
UNLOCK TABLES;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`,`role_id`),
  KEY `fk_users_roles1_idx` (`role_id`),
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (4,6,'rabyasoufiane@gmail.com','$2y$12$pfdcu8h2tdxi6zb9LxbC/e8X8TfcOxCe.Vn35kVg3IK66QYdgpQFO',NULL,'2024-05-21 13:23:35','2024-05-21 13:23:35'),(5,6,'soufiane@i.com','$2y$12$M7xHTdLtJXe6mW1eIDp4SeMoG8t9Ot0of.UMSNktymJ6civvyAUmu',NULL,'2024-05-21 16:13:28','2024-05-21 16:13:28'),(6,6,'soufiane@gmail.com','$2y$12$LbDb2w7biyrgtdvpjm9pe.BCpSjklxF0ZuCQYKin5E9u22A5871w2',NULL,'2024-05-21 16:34:34','2024-05-21 16:34:34'),(7,6,'hellod@gmail.com','$2y$12$jUHJfLXgZHqOFkPgAjwsfO0uXGOKSDC1UC8vtc9Y7TYacBHvLyT..',NULL,'2024-05-21 17:49:49','2024-05-21 17:49:49'),(8,6,'d@gmail.com','$2y$12$PSW47ngzTRlmo869cV4VJ.E4DvFEOpSBiz0QCS9WKMPBubmEYMslG',NULL,'2024-05-22 12:31:15','2024-05-22 12:31:15'),(10,6,'d33@gmail.com','$2y$12$g7OtLWKrFEUpgKjzBE3VcO2bavlATHI7QDH/6HDynOTULuqb1Pdoa',NULL,'2024-05-22 12:44:04','2024-05-22 12:44:04'),(11,6,'d33ddd@gmail.com','$2y$12$gDlndOywsRuTKoPVhG9NWOsVXKEJ/98SmCd8zhS0dgdOmPnxhqLcC',NULL,'2024-05-22 12:54:58','2024-05-22 12:54:58'),(12,6,'d33dddd@gmail.com','$2y$12$lkC8Vn16OEFqcsiOB673RuHLXRLxrr/u2uQYrLxIBi8vcpyiAzbRu',NULL,'2024-05-22 12:57:00','2024-05-22 12:57:00'),(13,6,'suiiilavie@gmil.con','$2y$12$CbjIZQ9H9.RIBbp8KX9uauRQnn3/tum0Vy4JI5CqFnpJrnzA2ov8m',NULL,'2024-05-22 13:07:28','2024-05-22 13:07:28'),(14,4,'sousssfiane@i.com','$2y$12$5ZicAYk/9lLGfwdus3MUTOufDxPw5Qjvr9oZwFfPN/JwZd3gRu7X.',NULL,'2024-05-22 14:47:00','2024-05-22 14:47:00'),(15,6,'soufianedddd@gmail.com','$2y$12$.t/L3J/yIi00CYoiJvd.t.c5w.Hcwfh4jTXy/hnbSbGIW0BX6ICDC',NULL,'2024-05-22 16:55:50','2024-05-22 16:55:50'),(16,6,'amine@g.com','$2y$12$ya86NhKqjsV8Oc1MJIBfqueq0owqIxhrwoUIgjND82bUCXjmbYn7O',NULL,'2024-05-23 10:09:51','2024-05-23 10:09:51');
UNLOCK TABLES;


