INSERT INTO [QWPlatform_Core_System].[dbo].[Test_Mask] (
		[PhoneNumber1]
		,[PhoneNumber2]
		,[PhoneNumber3]
		,[PhoneNumber4]
		,[CarNumber]
		,[Distance]
		,[Percent]
		,[NumberSum]
		,[NumberPercent]
)
OUTPUT inserted.Id
	VALUES (
		@PhoneNumber1
		,@PhoneNumber2
		,@PhoneNumber3
		,@PhoneNumber4
		,@CarNumber
		,@Distance
		,@Percent
		,@NumberSum
		,@NumberPercent
)