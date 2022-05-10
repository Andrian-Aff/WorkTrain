SELECT [Id]
      ,[ColDate]
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
  FROM [dbo].[Template]
  where #filter_columns#
 #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only