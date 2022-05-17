-- declare @Name nvarchar(100) = N'Працює'

SELECT per.[Date_Employ]
      ,COUNT(1) as [Kolvo]
FROM [QWPlatform_Core_General].[dbo].[Persons] as per
left join [QWPlatform_Core_General].[DIM].[Status] as s on s.Id = per.Status_Id
where (s.[Name] = @Name or @Name is null)
group by per.[Date_Employ]
order by  per.[Date_Employ]