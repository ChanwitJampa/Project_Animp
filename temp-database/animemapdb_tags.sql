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
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tags_id` int NOT NULL AUTO_INCREMENT,
  `tags_name` varchar(200) NOT NULL,
  `tags_universe_status` tinyint(1) DEFAULT '0',
  `tags_wallpaper` varchar(500) DEFAULT '-',
  PRIMARY KEY (`tags_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (2,'School',0,'-'),(3,'Game',0,'-'),(4,'Shojo',0,'-'),(6,'Shonen',0,'-'),(7,'Fate',1,'-'),(8,'Drama',0,'-'),(9,'Sci-Fi',0,'-'),(10,'Sword Art Online',1,'-'),(11,'Suzumiya Haruhi',1,'-'),(12,'Shokugeki no Soma',1,'-'),(13,'My Hero Academia',1,'-'),(14,'Action',0,'-'),(15,'Horror',0,'-'),(16,'Harem',0,'-'),(17,'Romantic',0,'-'),(18,'สืบสวนสอบสวน',0,'-'),(19,'ทำอาหาร',0,'-'),(20,'ผจญภัย',0,'-'),(21,'วิทยาศาสตร์',0,'-'),(22,'Sports',0,'-'),(23,'เกิดใหม่ต่างโลก',0,'-'),(24,'Historical ',0,'-'),(25,'Idols',0,'-'),(26,'Magic ',0,'-'),(27,'Mecha ',0,'-'),(28,'Music ',0,'-'),(29,'Mystery',0,'-'),(30,'Slice of Life ',0,'-'),(31,'Super Power',0,'-'),(32,'Workplace',0,'-'),(35,'พระเอกเก่ง',0,'-'),(36,'Fantasy',0,'-'),(37,'รักในโรงเรียน',0,'-'),(38,'ชีวิตประจำวัน',0,'-'),(39,'สาวน้อย',0,'-'),(40,'	Natsume Yuujinchou',1,'-'),(41,'Comedy',0,'-'),(42,'ฟฟฟฟ',0,'-');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-16 15:05:57
