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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `news_id` int NOT NULL AUTO_INCREMENT,
  `news_name` varchar(200) DEFAULT '-',
  `news_date` varchar(50) DEFAULT '-',
  `news_studio` varchar(200) DEFAULT '-',
  `news_wallpaper` varchar(500) DEFAULT '-',
  `news_description` varchar(2000) DEFAULT '-',
  PRIMARY KEY (`news_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Tokyo Revengers: Seiya Kessen-hen','01/2023','Liden Films','https://wiki.anime-os.com/image/2021/12/Tokyo-Revengers-Seiya-Kessen-hen-S2.jpg','ทาเคมิจิ ได้ข่าวว่า ฮินาตะ อดีตแฟนสาวตอนมัธยมต้นถูกแก๊งโตเกียวมันจิไคฆ่าตายพร้อมน้องชายของเธอ จนเขาพบว่าตนสามารถย้อนเวลาไป 12 ปีก่อน ในสมัยที่ตนมีชื่อเสียง เพื่อแก้ไขอดีตได้'),(2,'The Seven Deadly Sins: Grudge of Edinburgh Part 1/2','12/2023','Marvy Jack / Alfred Imageworks','https://wiki.anime-os.com/image/2021/12/The-Seven-Deadly-Sins-Grudge-of-Edinburgh-Part-12.jpg','เรื่องราวของลูกเมลิโอดัส ภาคต่อของ ศึกตำนาน 7 อัศวิน มี 2 พาร์ท'),(3,'Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu. Season 2','01/2023','Silver Link','https://wiki.anime-os.com/image/2020/03/Bofuri-Season-2-Teaser.jpg','คาเอเดะ (เมเปิ้ล) เด็กสาวที่ได้รับคำชวนให้มาเล่นเกมแบบโลกเสมือนจริง เน้นอัพค่า Vit เพราะไม่อยากเจ็บตัว แต่กลับกลายเป็นผู้เล่นที่แข็งแกร่ง จนเป็นที่รู้จักภายหลัง'),(4,'Shinka no Mi Season 2','01/2023','Hotline','https://wiki.anime-os.com/image/2022/01/Shinka-no-Mi-Season-2.jpg','เซอิจิ หนุ่มอ้วนที่ถูกคนอื่นรังแกประจำ วันหนึ่งพระเจ้าได้ส่งเขาและคนในโรงเรียนไปต่างโลก เซอิจิต้องผจญภัยตามลำพัง จนเขาได้กิน เมล็ดพันธุ์แห่งการวิวัฒนาการ ที่เปลี่ยนแปลงเขาไปจากเดิม'),(5,'NieR:Automata Ver 1.1a','01/2023','Hotline','https://wiki.anime-os.com/image/2022/02/NieRAutomata-Ver-1.1a.jpg','อนิเมะจากเกม NieR:Automata'),(6,'Gokushufudou Season 2close','01/2023','J.C.Staff','https://wiki.anime-os.com/image/2022/09/Gokushufudou-S2.jpg','ทัตสึ อมตะ ฉายาของอดีตยากูซ่าชื่อดัง จนเขาต้องออกจากวงการกลายมาเป็นพ่อบ้านพ่อเรือนมาดเข้ม'),(7,'Dr.Stone: New World (Season 3)','04/2023','TMS Entertainment','https://wiki.anime-os.com/image/2021/03/dr-stone.jpg','เกิดเหตุให้มนุษย์ทั้งโลกกลายเป็นหิน เวลาผ่านไปกว่าสามพันปี ในปี ค.ศ. 5738 เซ็นคุ และ ไทจู หลุดออกมาได้ และเริ่มใช้ความรู้ทางวิทยาศาสตร์พัฒนาความเป็นอยู่ของผู้คนที่อาศัยแบบย้อนยุค'),(8,'EDENS ZERO Season 2','04/2023','J.C.Staff','https://wiki.anime-os.com/image/2022/02/EDENS-ZERO-Season-2.jpg','ชิกิ ที่อยู่โดดเดี่ยวมานาน จนได้พบกับรีเบ็คก้าและแฮปปี้ ออกเดินทางไปด้วยกัน'),(9,'Isekai wa Smartphone to Tomo ni Season 2','04/2023','J.C.Staff','https://wiki.anime-os.com/image/2022/04/Isekai-wa-Smartphone-to-Tomo-ni-Season-2-1.jpg','โมจิซากิ โทยะ ตายเหราะความผิดของพระเจ้า ได้ชีวิตใหม่ในต่างโลก พร้อมสมาร์ทโฟนเทพที่มีฟังก์ชั่นมากมาย ทำให้เขาผจญภัยแบบสบายๆ บนโลกแฟนตาซี'),(10,'Tensei Kizoku no Isekai Boukenroku','04/2023','EMT² / Magic Bus','https://wiki.anime-os.com/image/2022/08/Tensei-Kizoku-no-Isekai-Boukenroku.jpg','หลังได้ช่วยเหลือเด็กผู้หญิงจนตาย ทำให้คาซึยะได้ไปเกิดใหม่ในโลกแฟนตาซีในชื่อ ไคน์ ฟอน ซิลฟอร์ด บุตรขุนนางพร้อมพลังมากมาย');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-16 15:05:43
