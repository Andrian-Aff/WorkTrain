update [dbo].[test_File_Details]
set
	[File] = @File,
	[File_Name] = @Name,
	[File_Comment] = @File_Comment
where Id = @Id