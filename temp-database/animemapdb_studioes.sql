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
-- Table structure for table `studioes`
--

DROP TABLE IF EXISTS `studioes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studioes` (
  `studioes_id` int NOT NULL AUTO_INCREMENT,
  `studioes_name` varchar(200) NOT NULL,
  `studioes_established` varchar(50) NOT NULL DEFAULT '-',
  `studioes_logo` varchar(500) DEFAULT '-',
  `studioes_image` varchar(500) DEFAULT '-',
  `studioes_description` varchar(2000) DEFAULT '-',
  PRIMARY KEY (`studioes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studioes`
--

LOCK TABLES `studioes` WRITE;
/*!40000 ALTER TABLE `studioes` DISABLE KEYS */;
INSERT INTO `studioes` VALUES (1,'CloverWorks','Oct 1, 2018','1835.png','-','CloverWorks (CloverWorks, Inc) is a Japanese subsidiary animation company from Suginami, Tokyo. It was original named Kouenji Studio under A-1 Pictures owned by parent company Aniplex. The studio was rebranded as CloverWorks in April 2018. In October 2018, CloverWorks separated from A-1 Pictures while remaining a subsidary of Aniplex. The studio has released 25 projects since its rebranding with an additional four projects - Slow Start, Darling in the Franxx, Persona 5: The Animation, and Ace At'),(2,'A-1 Pictures','May 9, 2005','56.png','-','A-1 Pictures (A-1 Pictures Inc.) is a Japanese animation studio in Suginami, Tokyo. Founded by former Sunrise producer Mikihiro Iwata in 2005, it was established as a subsidary of Aniplex. The studio was meant to oversee Aniplex\'s family-oriented series before it evolved into producing various independent anime projects.'),(3,'Wit Studio','Jun 1, 2012','858.png','-','-'),(4,'Bones','Oct, 1998','4.png','-','Bones (Bones Inc.) is a Japanese animation studio based in Suginami, Tokyo. The studio was founded by previous Sunrise producer Masahiko Minami and animators Hiroshi Ousaka and Toshihiro Kawamoto in 1998. Following Sunrise\'s production model, Bones\' founders divided the company into five smaller studios, Studio A-E.'),(5,'White Fox','Apr, 2007','314.png','-','-'),(6,'Madhouse','Oct, 1972','11.png','-','Madhouse (MADHOUSE Inc.) is a Japanese animation studio based in Nakano City, Tokyo. Ex-Mushi Production animators—including Masao Maruyama, Osamu Dezaki, Rintarou, and Yoshiaki Kawajiri—are often credited with founding the company in 1972, though Rintarou would not join the studio until 1982. Madhouse primarily did contract work for other studios until the 1990s, when it achieved success independently. Television adaptations of Trigun and Clamp\'s Cardcaptor Sakura in 1998 were hits domestically'),(7,'Kyoto Animation','Jul 12, 1985','2.png','-','Kyoto Animation (Kyoto Animation Co., Ltd.) (often abbreviated KyoAni) is a Japanese animation studio based in Uji, Kyoto Prefecture. Youko Hatta (born Youko Sugiyama), who had previously studied under Osamu Tezuka as an artist at Mushi Production, founded the company with her husband, Hideaki Hatta, in 1981. Kyoto Animation spent its early years doing finishing work for other companies\' productions, but opened its own drawing department in 1986, the year following its establishment as a limited'),(8,'ufotable','Oct, 2000','43.png','-','ufotable is a Japanese animation studio based in Suginami, Tokyo. Hikaru Kondou—a former production assistant at Tokyo Movie Shinsha (now TMS Entertainment) and Telecom Animation Film and producer at Step Eizou—founded the studio in October 2000. The company\'s name originates from a UFO-shaped table Kondou came across as he was devising the studio\'s vision. He subsequently acquired the table and named the studio after it.'),(9,'Production I.G','Nov, 2007','10.png','-','-'),(10,'J.C.Staff','Jan 18, 1986','7.png','-','J.C.Staff (J.C.STAFF Co., Ltd.) is a Japanese animation studio based in Musashino, Tokyo, and a member of The Association of Japanese Animations. Former Tatsunoko Production producer Tomoyuki Miyata founded the studio in January 1986, which specialized in Original Video Animation (OVA) in its early years. J.C.Staff made the move to television with the release of Metal Fighter Miku in the summer of 1994. It has since independently produced or contributed to over 200 animated works.'),(11,'David Production','Sep, 2007','287.png','-','-'),(12,'TMS Entertainment','Oct, 1946','73.png','-','-'),(13,'Studio Ghibli','Jun, 1985','21.png','-','-'),(14,'P.A. Works','Nov 10, 2000','132.png','-','-'),(15,'Sunrise','Nov, 1976','14.png','-','-'),(16,'MAPPA','Jun 14, 2011','569.png','-','MAPPA (MAPPA Co., Ltd.) is a Japanese animation studio founded by Masao Maruyama in June 2014, following his departure from Madhouse. It employs 250 people as of December 2021 between its Tokyo and Sendai studios. Maruyama\'s intent was for the film Kono Sekai no Katasumi ni (In This Corner of the World) to be the studio\'s first release, though the project would not be complete until 2016. By that time, the studio had already co-produced Sakamichi no Apollon (Kids on the Slope) and Hajime no Ippo'),(17,'Pierrot','May, 1979','1.png','-','-'),(18,'CoMix Wave Films','Mar, 2007','291.png','-','-'),(19,'B.CMAY PICTURES','Apr, 2017','1350.png','-','-'),(20,'Toei Animation','Jan 23, 1948','18.png','-','-'),(21,'Brain\'s Base','Jul, 1996','112.png','-','-'),(22,'Studio 3Hz','Mar, 2013','1127.png','-','-'),(23,'Lerche','2011','456.png','-','-'),(24,'LIDENFILMS','Feb 22, 2012','839.png','-','-'),(25,'Kinema Citrus','Mar 3, 2008','290.png','-','-'),(26,'Studio Deen','Mar 14, 1975','37.png','-','-'),(27,'SILVER LINK.','Dec, 2007','300.png','-','SILVER LINK. (SILVER LINK., Inc.) is a Japanese animation studio based in based in Mitaka City, Tokyo. The studio was founded by former Frontline animation producer Hayato Kaneko in December 2007 and specialized in subcontracting for drawing work. The company also owned two subsidiary studios, BEEP Co. and CONNECT Inc., both of which have been dissolved. In 2020, Asahi Broadcasting Group Holdings aquired SILVER LINK.');
/*!40000 ALTER TABLE `studioes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-16 15:05:59
