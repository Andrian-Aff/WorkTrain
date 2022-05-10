SELECT
		[t].[Id]
		,[t].[PhoneNumber1]
		,[t].[PhoneNumber2]
		,[t].[PhoneNumber3]
		,[t].[PhoneNumber4]
		,[t].[CarNumber]
		,[t].[Distance]
		,[t].[Percent]
		,[t].[NumberSum]
		,[t].[NumberPercent]
FROM [QWPlatform_Core_System].[dbo].[Test_Mask] as [t]
WHERE t.[Id] = @Id