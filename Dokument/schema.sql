-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema zimbabwe
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `zimbabwe` ;

-- -----------------------------------------------------
-- Schema zimbabwe
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `zimbabwe` DEFAULT CHARACTER SET utf8 ;
USE `zimbabwe` ;

-- -----------------------------------------------------
-- Table `zimbabwe`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zimbabwe`.`user` ;

CREATE TABLE IF NOT EXISTS `zimbabwe`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zimbabwe`.`video`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zimbabwe`.`video` ;

CREATE TABLE IF NOT EXISTS `zimbabwe`.`video` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `filepath` VARCHAR(250) NOT NULL,
  `user_id` INT NOT NULL,
  `comment` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_video_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_video_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zimbabwe`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zimbabwe`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zimbabwe`.`comment` ;

CREATE TABLE IF NOT EXISTS `zimbabwe`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(250) NOT NULL,
  `commenter_id` INT NOT NULL,
  `video_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user_idx` (`commenter_id` ASC) VISIBLE,
  INDEX `fk_comment_video1_idx` (`video_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`commenter_id`)
    REFERENCES `zimbabwe`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_video1`
    FOREIGN KEY (`video_id`)
    REFERENCES `zimbabwe`.`video` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zimbabwe`.`playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zimbabwe`.`playlist` ;

CREATE TABLE IF NOT EXISTS `zimbabwe`.`playlist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_playlist_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zimbabwe`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zimbabwe`.`listedVideo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zimbabwe`.`listedVideo` ;

CREATE TABLE IF NOT EXISTS `zimbabwe`.`listedVideo` (
  `video_id` INT NOT NULL,
  `playlist_id` INT NOT NULL,
  PRIMARY KEY (`video_id`, `playlist_id`),
  INDEX `fk_video_has_playlist_playlist1_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_video_has_playlist_video1_idx` (`video_id` ASC) VISIBLE,
  CONSTRAINT `fk_video_has_playlist_video1`
    FOREIGN KEY (`video_id`)
    REFERENCES `zimbabwe`.`video` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_video_has_playlist_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `zimbabwe`.`playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zimbabwe`.`reaction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zimbabwe`.`reaction` ;

CREATE TABLE IF NOT EXISTS `zimbabwe`.`reaction` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `video_id` INT NOT NULL,
  `like` TINYINT NOT NULL,
  PRIMARY KEY (`user_id`, `video_id`),
  INDEX `fk_user_has_video_video1_idx` (`video_id` ASC) VISIBLE,
  INDEX `fk_user_has_video_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_video_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zimbabwe`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_video_video1`
    FOREIGN KEY (`video_id`)
    REFERENCES `zimbabwe`.`video` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE USER zimbabwe_user IDENTIFIED BY "1234";
GRANT
  SELECT,
  INSERT,
  UPDATE,
  DELETE
ON
  zimbabwe.*
TO
  zimbabwe_user;
  
ALTER USER 'zimbabwe_user' IDENTIFIED WITH mysql_native_password BY '1234';
flush privileges;

