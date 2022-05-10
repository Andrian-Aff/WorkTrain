declare @output table ([Id] int);

insert into [dbo].[test_Files]
(
	[File_Img],
	[File_Img_Name],
	[File],
	[File_Name]
)
output [inserted].[Id] into @output([Id])
values
(
     @File_Img,
    @File_Img_Name,
    @File,
    @File_Name
);

declare @insertedId int;
set @insertedId = (select top 1 [Id] from @output);




select @insertedId as [Id];
return;