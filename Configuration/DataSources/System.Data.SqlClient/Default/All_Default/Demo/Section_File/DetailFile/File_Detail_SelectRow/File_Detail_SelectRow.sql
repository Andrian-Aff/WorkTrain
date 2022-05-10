select 
[Id]
,[File_Id]
,[File]
,[File_Name] as [Name]
,[File_Comment]  
from [dbo].[test_File_Details]
where Id = @Id