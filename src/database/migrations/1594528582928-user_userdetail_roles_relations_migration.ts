import {MigrationInterface, QueryRunner} from "typeorm";

export class userUserdetailRolesRelationsMigration1594528582928 implements MigrationInterface {
    name = 'userUserdetailRolesRelationsMigration1594528582928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_details` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(25) NOT NULL, `lastname` varchar(25) NOT NULL, `password` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp NOT NULL, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(20) NOT NULL, `description` text NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp NOT NULL, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles` (`usersId` int NOT NULL, `rolesId` int NOT NULL, INDEX `IDX_99b019339f52c63ae615358738` (`usersId`), INDEX `IDX_13380e7efec83468d73fc37938` (`rolesId`), PRIMARY KEY (`usersId`, `rolesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD `user_detail_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD UNIQUE INDEX `IDX_7fbd789ba2d9f9643ff3be7e7b` (`user_detail_id`)");
        await queryRunner.query("ALTER TABLE `users` CHANGE `created_at` `created_at` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_7fbd789ba2d9f9643ff3be7e7b` ON `users` (`user_detail_id`)");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_7fbd789ba2d9f9643ff3be7e7b0` FOREIGN KEY (`user_detail_id`) REFERENCES `user_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_99b019339f52c63ae6153587380` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_13380e7efec83468d73fc37938e` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_13380e7efec83468d73fc37938e`");
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_99b019339f52c63ae6153587380`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_7fbd789ba2d9f9643ff3be7e7b0`");
        await queryRunner.query("DROP INDEX `REL_7fbd789ba2d9f9643ff3be7e7b` ON `users`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `users` CHANGE `created_at` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()");
        await queryRunner.query("ALTER TABLE `users` DROP INDEX `IDX_7fbd789ba2d9f9643ff3be7e7b`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `user_detail_id`");
        await queryRunner.query("DROP INDEX `IDX_13380e7efec83468d73fc37938` ON `user_roles`");
        await queryRunner.query("DROP INDEX `IDX_99b019339f52c63ae615358738` ON `user_roles`");
        await queryRunner.query("DROP TABLE `user_roles`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP TABLE `user_details`");
    }

}
