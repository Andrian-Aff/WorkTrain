SELECT [Id]
      ,[Name]
  FROM [AVZ].[DIM].[Region]
  where  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only