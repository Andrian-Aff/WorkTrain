UPDATE [QWPlatform_Core_System].[dbo].[Test_Mask] SET
		[PhoneNumber1] = @PhoneNumber1
		,[PhoneNumber2] = @PhoneNumber2
		,[PhoneNumber3] = @PhoneNumber3
		,[PhoneNumber4] = @PhoneNumber4
		,[CarNumber] = @CarNumber
		,[Distance] = @Distance
		,[Percent] = @Percent
		,[NumberSum] = @NumberSum
		,[NumberPercent] = @NumberPercent
WHERE [Id] = @Id