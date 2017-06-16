namespace AlarmClock.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ssettingsreference : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ClockSettings", "ScheduleId", "dbo.Schedules");
            DropIndex("dbo.ClockSettings", new[] { "ScheduleId" });
            AlterColumn("dbo.ClockSettings", "ScheduleId", c => c.Long());
            CreateIndex("dbo.ClockSettings", "ScheduleId");
            AddForeignKey("dbo.ClockSettings", "ScheduleId", "dbo.Schedules", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ClockSettings", "ScheduleId", "dbo.Schedules");
            DropIndex("dbo.ClockSettings", new[] { "ScheduleId" });
            AlterColumn("dbo.ClockSettings", "ScheduleId", c => c.Long(nullable: false));
            CreateIndex("dbo.ClockSettings", "ScheduleId");
            AddForeignKey("dbo.ClockSettings", "ScheduleId", "dbo.Schedules", "Id", cascadeDelete: true);
        }
    }
}
