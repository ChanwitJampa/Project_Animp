-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema animemapdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema animemapdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `animemapdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `animemapdb` ;

-- -----------------------------------------------------
-- Table `animemapdb`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`accounts` (
  `accounts_id` INT NOT NULL AUTO_INCREMENT,
  `accounts_name` VARCHAR(50) NOT NULL,
  `accounts_user` VARCHAR(50) NOT NULL,
  `accounts_pwd` VARCHAR(500) NOT NULL,
  `accounts_DoB` DATE NULL DEFAULT NULL,
  `accounts_level` DOUBLE NULL DEFAULT '0',
  `accounts_totalAnime` INT NULL DEFAULT '0',
  `accounts_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accounts_role` ENUM('admin', 'user') NULL DEFAULT 'user',
  PRIMARY KEY (`accounts_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `animemapdb`.`animes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`animes` (
  `animes_id` INT NOT NULL AUTO_INCREMENT,
  `animes_name` VARCHAR(150) NOT NULL,
  `animes_nameTH` VARCHAR(150) NULL DEFAULT '-',
  `animes_trailer` VARCHAR(1000) NULL DEFAULT '-',
  `animes_episodes` INT NULL DEFAULT '0',
  `animes_score` DOUBLE NULL DEFAULT '0',
  `animes_image` VARCHAR(1000) NULL DEFAULT '-',
  `animes_seasonal` ENUM('Spring', 'Winter', 'Summer', 'Fall') NULL DEFAULT NULL,
  `animes_year` INT NULL DEFAULT '0',
  `animes_content` VARCHAR(3000) NULL DEFAULT '-',
  `animes_wallpaper` VARCHAR(1000) NULL DEFAULT '-',
  `animes_duration` VARCHAR(50) NULL DEFAULT '-',
  `animes_studioes` VARCHAR(200) NULL DEFAULT '-',
  `animes_streaming` VARCHAR(1000) NULL DEFAULT '-',
  PRIMARY KEY (`animes_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 235
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `animemapdb`.`animedetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`animedetails` (
  `animeDetails_id` INT NOT NULL AUTO_INCREMENT,
  `animedetails_watchYear` VARCHAR(50) NULL DEFAULT '-',
  `animedetails_score` DOUBLE NULL DEFAULT '0',
  `animeDetails_animes_id` INT NOT NULL,
  `animeDetails_accounts_id` INT NOT NULL,
  `animeDetails_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`animeDetails_id`),
  INDEX `animes_id_idx` (`animeDetails_animes_id` ASC) VISIBLE,
  INDEX `accounts_id_idx` (`animeDetails_accounts_id` ASC) VISIBLE,
  CONSTRAINT `animeDetails_accounts_id`
    FOREIGN KEY (`animeDetails_accounts_id`)
    REFERENCES `animemapdb`.`accounts` (`accounts_id`),
  CONSTRAINT `animeDetails_animes_id`
    FOREIGN KEY (`animeDetails_animes_id`)
    REFERENCES `animemapdb`.`animes` (`animes_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 34
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `animemapdb`.`news`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`news` (
  `news_id` INT NOT NULL AUTO_INCREMENT,
  `news_name` VARCHAR(200) NULL DEFAULT '-',
  `news_date` VARCHAR(50) NULL DEFAULT '-',
  `news_studio` VARCHAR(200) NULL DEFAULT '-',
  `news_wallpaper` VARCHAR(500) NULL DEFAULT '-',
  `news_description` VARCHAR(2000) NULL DEFAULT '-',
  PRIMARY KEY (`news_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `animemapdb`.`studioes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`studioes` (
  `studioes_id` INT NOT NULL AUTO_INCREMENT,
  `studioes_name` VARCHAR(200) NOT NULL,
  `studioes_established` VARCHAR(50) NOT NULL DEFAULT '-',
  `studioes_logo` VARCHAR(500) NULL DEFAULT '-',
  `studioes_image` VARCHAR(500) NULL DEFAULT '-',
  `studioes_description` VARCHAR(2000) NULL DEFAULT '-',
  PRIMARY KEY (`studioes_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `animemapdb`.`studiodetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`studiodetails` (
  `studioDetails_id` INT NOT NULL AUTO_INCREMENT,
  `studioDetails_animes_id` INT NULL DEFAULT NULL,
  `studioDetails_studioes_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`studioDetails_id`),
  INDEX `studioDetail_animes_idx` (`studioDetails_animes_id` ASC) VISIBLE,
  INDEX `studioDetail_studioes_idx` (`studioDetails_studioes_id` ASC) VISIBLE,
  CONSTRAINT `studioDetail_animes_id`
    FOREIGN KEY (`studioDetails_animes_id`)
    REFERENCES `animemapdb`.`animes` (`animes_id`),
  CONSTRAINT `studioDetail_studioes_id`
    FOREIGN KEY (`studioDetails_studioes_id`)
    REFERENCES `animemapdb`.`studioes` (`studioes_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `animemapdb`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`tags` (
  `tags_id` INT NOT NULL AUTO_INCREMENT,
  `tags_name` VARCHAR(200) NOT NULL,
  `tags_universe_status` TINYINT(1) NULL DEFAULT '0',
  `tags_wallpaper` VARCHAR(500) NULL DEFAULT '-',
  PRIMARY KEY (`tags_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 43
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `animemapdb`.`tagdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`tagdetails` (
  `tagDetails_id` INT NOT NULL AUTO_INCREMENT,
  `tagDetails_tags_id` INT NOT NULL,
  `tagDetails_animes_id` INT NOT NULL,
  PRIMARY KEY (`tagDetails_id`),
  INDEX `tags_id_idx` (`tagDetails_tags_id` ASC) VISIBLE,
  INDEX `animes_id_idx` (`tagDetails_animes_id` ASC) VISIBLE,
  CONSTRAINT `tagDetails_animes_id`
    FOREIGN KEY (`tagDetails_animes_id`)
    REFERENCES `animemapdb`.`animes` (`animes_id`),
  CONSTRAINT `tagDetails_tags_id`
    FOREIGN KEY (`tagDetails_tags_id`)
    REFERENCES `animemapdb`.`tags` (`tags_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 142
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `animemapdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animemapdb`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(3) NULL DEFAULT NULL,
  `updated_at` DATETIME(3) NULL DEFAULT NULL,
  `deleted_at` DATETIME(3) NULL DEFAULT NULL,
  `email` VARCHAR(191) NULL DEFAULT NULL,
  `pwd` LONGTEXT NULL DEFAULT NULL,
  `role` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `idx_users_deleted_at` (`deleted_at` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
