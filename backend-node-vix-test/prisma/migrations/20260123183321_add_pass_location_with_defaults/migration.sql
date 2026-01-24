-- AlterTable
ALTER TABLE `vM` ADD COLUMN `location` ENUM('bre_barueri', 'usa_miami') NULL,
    ADD COLUMN `pass` VARCHAR(191) NOT NULL DEFAULT '$2a$10$LZnsY.42LsXhb1gF6qzmEebBR4/UWQu/SvzMOsRLZiK/M659ejE5W';
