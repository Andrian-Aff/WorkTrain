SELECT [Id]
      ,[ParentId]
      ,[Name]
  FROM [dbo].[TemplateCatalog]
  where #filter_columns#
-- #sort_columns#
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only