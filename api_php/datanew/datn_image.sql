-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: datn
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `IMAGE_ID` int NOT NULL AUTO_INCREMENT,
  `IMAGE_LINK` varchar(255) NOT NULL,
  `PRODUCT_ID` int NOT NULL,
  PRIMARY KEY (`IMAGE_ID`),
  KEY `PRODUCT_ID` (`PRODUCT_ID`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `product` (`PRODUCT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (49,'http://127.0.0.1:8686/uploads/a33b0edd64f87aa8cfc3d267ed41eb49.png',3),(50,'http://127.0.0.1:8686/uploads/429415177_770448331661513_6739695101830428237_n.jpg',3),(80,'https://www.w3schools.com/howto/img_avatar.png',2),(81,'https://www.w3schools.com/howto/img_avatar2.png',2),(83,'http://127.0.0.1:8686/uploads/erdreal.drawio.png',1),(84,'https://www.w3schools.com/howto/img_avatar.png',4),(85,'https://www.w3schools.com/howto/img_avatar2.png',4),(86,'https://www.w3schools.com/howto/img_avatar.png',6),(87,'https://www.w3schools.com/howto/img_avatar2.png',6),(88,'https://www.w3schools.com/howto/img_avatar.png',7),(89,'https://www.w3schools.com/howto/img_avatar2.png',7),(90,'https://www.w3schools.com/howto/img_avatar.png',8),(91,'https://www.w3schools.com/howto/img_avatar2.png',8),(96,'http://127.0.0.1:8686/uploads/429415177_770448331661513_6739695101830428237_n.jpg',13),(97,'http://127.0.0.1:8686/uploads/CV.png',13);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-09  8:56:16
