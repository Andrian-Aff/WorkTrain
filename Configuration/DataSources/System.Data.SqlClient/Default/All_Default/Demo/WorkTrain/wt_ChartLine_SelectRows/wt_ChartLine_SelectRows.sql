
SELECT per.[Date_Employ]
      ,COUNT(1) as [Kolvo]
FROM [QWPlatform_Core_General].[dbo].[Persons] as per
group by per.[Date_Employ]
order by  per.[Date_Employ]