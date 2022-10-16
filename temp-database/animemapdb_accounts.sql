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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `accounts_id` int NOT NULL AUTO_INCREMENT,
  `accounts_name` varchar(50) NOT NULL,
  `accounts_user` varchar(50) NOT NULL,
  `accounts_pwd` varchar(500) NOT NULL,
  `accounts_DoB` date DEFAULT NULL,
  `accounts_level` double DEFAULT '0',
  `accounts_totalAnime` int DEFAULT '0',
  `accounts_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accounts_role` enum('admin','user') DEFAULT 'user',
  PRIMARY KEY (`accounts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'plai','adminPlai','@4801',NULL,0,0,'2022-09-24 04:10:05','admin'),(4,'test','adminTest','@test',NULL,0,0,'2022-09-26 16:53:02','user'),(13,'fouth','adminFourth','@4755',NULL,0,0,'2022-10-04 15:15:13','admin'),(14,'testCreate','testCreate','testCreate',NULL,0,0,'2022-10-05 17:55:48','user'),(15,'testCreate','testCreate','testCreate',NULL,0,0,'2022-10-05 17:59:23','user'),(16,'testCreate','fourth','123456',NULL,0,0,'2022-10-05 18:05:37','user'),(17,'fourth','fourth@gmail.com','123456',NULL,0,0,'2022-10-05 18:06:56','user'),(18,'Dream','TestTest','123456',NULL,0,0,'2022-10-06 01:17:49','user'),(19,'TestDream','Dream','1111',NULL,0,0,'2022-10-06 01:21:26','user'),(20,'1234','1234','Tungbie',NULL,0,0,'2022-10-06 03:20:33','user'),(21,'bie','tungby555@hotmail.com','tungby',NULL,0,0,'2022-10-06 06:33:26','user'),(22,'MynamDream','Dream','1111',NULL,0,0,'2022-10-06 08:54:34','user'),(24,'test','test','$2a$10$2Jgwi4h1qwCI3WFRRL0Q/uVS/2fvbkvQkXxJme/2ZDpcXxcl86WKi',NULL,0,0,'2022-10-11 09:53:13','user'),(25,'testCreate','testCreate','testCreate',NULL,0,0,'2022-10-14 15:10:09','user');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-16 15:05:48
