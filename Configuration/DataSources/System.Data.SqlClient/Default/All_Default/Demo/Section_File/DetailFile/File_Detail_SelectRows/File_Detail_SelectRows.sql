select 
[Id]
,[File_Id]
,[File]
,[File_Name] as [Name]
,[File_Comment] 
from [dbo].[test_File_Details]
where [File_Id] = @File_Id
and #filter_columns#
#sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only