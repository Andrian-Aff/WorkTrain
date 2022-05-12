select sum([is_work]) as [is_work],
	   sum([is_vacation]) as [is_vacation],
	   sum([is_not_work]) as [is_not_work]
from (
	SELECT  case when  s.[Name] = N'Працює' then 1 else 0 end as [is_work],
			case when s.[Name] = N'Відпустка' then 1 else 0 end as [is_vacation],
			case when s.[Name] = N'Не працює' then 1 else 0 end as [is_not_work]
		  ,s.[Name] as [StatusName]
	FROM [QWPlatform_Core_General].[dbo].[Persons] as per
	left join [QWPlatform_Core_General].[DIM].[Department] as d on d.Id = per.Department_Id
	left join [QWPlatform_Core_General].[DIM].[Position] as p on p.Id = per.Position_Id
	left join [QWPlatform_Core_General].[DIM].[Status] as s on s.Id = per.Status_Id
) as t1