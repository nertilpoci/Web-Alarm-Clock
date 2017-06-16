namespace AlarmClock.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ssettings : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Alarms",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Note = c.String(),
                        ScheduleId = c.Long(nullable: false),
                        Time = c.String(),
                        ToneId = c.Long(),
                        UserId = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Schedules", t => t.ScheduleId, cascadeDelete: true)
                .ForeignKey("dbo.Tones", t => t.ToneId)
                .Index(t => t.ScheduleId)
                .Index(t => t.ToneId);
            
            CreateTable(
                "dbo.Schedules",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        UserId = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tones",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        FileName = c.String(),
                        UserId = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ClockSettings",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        ScheduleId = c.Long(nullable: false),
                        UserId = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Schedules", t => t.ScheduleId, cascadeDelete: true)
                .Index(t => t.ScheduleId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ClockSettings", "ScheduleId", "dbo.Schedules");
            DropForeignKey("dbo.Alarms", "ToneId", "dbo.Tones");
            DropForeignKey("dbo.Alarms", "ScheduleId", "dbo.Schedules");
            DropIndex("dbo.ClockSettings", new[] { "ScheduleId" });
            DropIndex("dbo.Alarms", new[] { "ToneId" });
            DropIndex("dbo.Alarms", new[] { "ScheduleId" });
            DropTable("dbo.ClockSettings");
            DropTable("dbo.Tones");
            DropTable("dbo.Schedules");
            DropTable("dbo.Alarms");
        }
    }
}
