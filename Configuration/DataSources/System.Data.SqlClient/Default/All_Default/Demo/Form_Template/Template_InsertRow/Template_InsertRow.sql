Insert into [dbo].[Template] ([ColDate]
							  ,[ColTime]
							  ,[ColDateTime]
							  ,[ColChar]
							  ,[ColVarchar]
							  ,[ColIntRadio]
							  ,[ColBitCheck]
							  ,[ColIntTree]
							  ,[ColFile]
							  ,[ColFileName]
							  ,[ColImage]
							  ,[ColDecimal]
							)
output inserted.Id
values (@ColDate
      ,@ColTime
      ,@ColDateTime
      ,@ColChar
      ,@ColVarchar
      ,@ColIntRadio
      ,@ColBitCheck
      ,@ColIntTree
      ,@ColFile
      ,@ColFileName
      ,@ColImage
	  ,@ColDecimal
	  )