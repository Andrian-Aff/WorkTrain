SELECT [Id]
      ,[File]
      ,[Name]
  FROM [dbo].[TemplateFiles]
  where TemplateId = @TemplateId 
  and #filter_columns#
 #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only