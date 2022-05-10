Insert into [dbo].[TemplateFiles] ([File]
							  ,[Name]
							  ,[TemplateId]
							)
output inserted.Id
values (@File
      ,@Name
	  ,@TemplateId
	  )