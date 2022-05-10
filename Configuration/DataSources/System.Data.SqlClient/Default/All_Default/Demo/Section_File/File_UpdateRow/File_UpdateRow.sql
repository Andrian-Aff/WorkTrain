update [dbo].[test_Files]
set
	[File_Img] = @File_Img,
	[File_Img_Name] = @File_Img_Name,
	[File] = @File,
	[File_Name] = @File_Name
where Id = @Id