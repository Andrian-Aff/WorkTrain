declare @output table ([Id] int);

insert into [dbo].[test_File_Details]
(
	[File_Id],
	[File],
	[File_Name]
)
output [inserted].[Id] into @output([Id])
values
(
    @File_Id,
    @File,
    @Name
);

declare @insertedId int;
set @insertedId = (select top 1 [Id] from @output);




select @insertedId as [Id];
return;