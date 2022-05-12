
SELECT  per.[Id]
      ,per.[First_Name]+N' '+per.[Second_Name]+N' '+per.[Last_Name] as [PIB]
      ,per.[Date_Employ]
      ,per.[Date_Uneploy]
      ,d.[Name] as [DepartmentName]
      ,p.[Name] as [PositionName]
      ,s.[Name] as [StatusName]
  FROM [QWPlatform_Core_General].[dbo].[Persons] as per
  left join [QWPlatform_Core_General].[DIM].[Department] as d on d.Id = per.Department_Id
  left join [QWPlatform_Core_General].[DIM].[Position] as p on p.Id = per.Position_Id
  left join [QWPlatform_Core_General].[DIM].[Status] as s on s.Id = per.Status_Id
