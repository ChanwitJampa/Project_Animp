-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 20.194.171.207    Database: animemapdb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animedetails`
--

DROP TABLE IF EXISTS `animedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animedetails` (
  `animeDetails_id` int NOT NULL AUTO_INCREMENT,
  `animedetails_watchYear` varchar(50) DEFAULT '-',
  `animedetails_score` double DEFAULT '0',
  `animeDetails_animes_id` int NOT NULL,
  `animeDetails_accounts_id` int NOT NULL,
  `animeDetails_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`animeDetails_id`),
  KEY `animes_id_idx` (`animeDetails_animes_id`),
  KEY `accounts_id_idx` (`animeDetails_accounts_id`),
  CONSTRAINT `animeDetails_accounts_id` FOREIGN KEY (`animeDetails_accounts_id`) REFERENCES `accounts` (`accounts_id`),
  CONSTRAINT `animeDetails_animes_id` FOREIGN KEY (`animeDetails_animes_id`) REFERENCES `animes` (`animes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animedetails`
--

LOCK TABLES `animedetails` WRITE;
/*!40000 ALTER TABLE `animedetails` DISABLE KEYS */;
INSERT INTO `animedetails` VALUES (2,'2022',0,2,1,'2022-10-04 17:25:22'),(3,'2022',0,1,1,'2022-10-04 17:33:38'),(4,'2022',0,1,1,'2022-10-05 17:00:11'),(5,'2022',0,123,4,'2022-10-05 17:07:08'),(6,'2022',0,1,1,'2022-10-05 17:10:06'),(7,'2022',0,2,4,'2022-10-05 17:11:04'),(8,'2022',0,95,4,'2022-10-05 17:20:11'),(9,'2022',10,1,1,'2022-10-05 17:23:19'),(10,'2022',10,1,1,'2022-10-05 17:24:18'),(11,'-',0,118,4,'2022-10-05 17:28:37'),(12,'-',0,167,4,'2022-10-05 17:36:58'),(13,'-',0,119,4,'2022-10-05 17:38:05'),(14,'-',0,121,4,'2022-10-05 17:43:04'),(15,'-',0,22,4,'2022-10-05 17:43:31'),(16,'-',0,6,4,'2022-10-05 17:43:39'),(17,'-',0,96,4,'2022-10-05 17:50:35'),(18,'2020',4,167,17,'2022-10-05 18:07:44'),(19,'2020',6,121,17,'2022-10-05 18:09:25'),(20,'2016',6,119,17,'2022-10-06 06:42:15'),(21,'',5,130,17,'2022-10-06 06:42:52'),(22,'',6,154,17,'2022-10-06 06:45:03'),(23,'',6,122,17,'2022-10-06 06:51:03'),(24,'',7,97,17,'2022-10-06 06:55:40'),(25,'',10,96,17,'2022-10-06 06:55:51'),(26,'',10,5,17,'2022-10-06 07:59:42'),(27,'',9,1,17,'2022-10-06 08:33:45'),(28,'2016',6,95,17,'2022-10-06 08:34:00'),(29,'',8,118,17,'2022-10-06 08:35:08'),(30,'',6,123,17,'2022-10-06 08:35:11'),(31,'2022',9,127,17,'2022-10-06 15:53:58'),(32,'',7,99,17,'2022-10-06 15:54:05'),(33,'2022',9,106,17,'2022-10-06 15:54:55'),(34,'2021',7,123,18,'2022-10-14 15:24:32'),(35,'2019',9,121,18,'2022-10-14 15:24:40'),(36,'2020',9,122,18,'2022-10-14 15:24:54');
/*!40000 ALTER TABLE `animedetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-16 15:05:37
