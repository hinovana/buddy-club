const CLUB_DATA_TSV = `
サッカー	クラブ	シニア	水	15:00	550	8250	11000			
サッカー	クラブ	シニア	月	16:00						
器械体操	スクール	シニア	火	15:00	550	8250	11000			
器械体操	スクール	シニア	水	16:00						
器械体操	スクール	シニア	金	15:00						
器械体操	スクール	シニア	金	16:00						
器械体操	スクール	シニア	日	9:00						
器械体操	スクール	シニア	日	11:00						
ドッヂボール	クラブ	シニア	火	15:00	550	8250	11000
バスケ	クラブ	シニア	火	16:00	550	8250	11000			
バスケ	クラブ	シニア	木	15:00						
バスケ	クラブ	シニア	金	15:00						
バスケ	クラブ	シニア	土	9:00						
バスケ	クラブ	シニア	日	9:00						
陸上	クラブ	シニア	月	15:00	550	8250	11000	13750	16500	19250
陸上	クラブ	シニア	火	15:00						
陸上	クラブ	シニア	水	15:00						
陸上	クラブ	シニア	木	16:00						
陸上	クラブ	シニア	金	16:00						
陸上	クラブ	シニア	土	9:00						
陸上	クラブ	シニア	日	9:00						
柔道	クラブ	シニア	月	15:00	550	8250	11000	13750	16500	19250
柔道	クラブ	シニア	水	15:00						
柔道	クラブ	シニア	金	15:00						
テニス	クラブ	シニア	月	15:00	550	9350	12650			
テニス	クラブ	シニア	火	15:00						
テニス	クラブ	シニア	水	15:00						
テニス	クラブ	シニア	月	16:00						
テニス	クラブ	シニア	火	16:00						
テニス	クラブ	シニア	木	16:00						
テニス	クラブ	シニア	金	16:00						
野球	クラブ	シニア	月	15:00	550	9350	12100			
野球	クラブ	シニア	火	15:00						
野球	クラブ	シニア	水	16:00						
ボルダリング	クラブ	シニア	月	15:00	550	10550	16550	21550		
ボルダリング	クラブ	シニア	水	15:00						
ボルダリング	クラブ	シニア	金	15:00						
ボルダリング	クラブ	シニア	月	16:00						
ボルダリング	クラブ	シニア	木	16:00						
ダンス	クラブ	シニア	月	16:00	550	8250	11000			
ダンス	クラブ	シニア	金	15:00						
英会話:初級	スクール	シニア	月	15:00	550	9350	13750	20350		
英会話:初級	スクール	シニア	火	15:00						
英会話:初級	スクール	シニア	水	15:00						
英会話:初級	スクール	シニア	木	15:00						
英会話:初級	スクール	シニア	金	15:00						
英会話:中級	スクール	シニア	月	16:00	550	9350	13750	20350		
英会話:中級	スクール	シニア	火	16:00						
英会話:中級	スクール	シニア	水	16:00						
英会話:中級	スクール	シニア	水	16:00						
英会話:中級	スクール	シニア	金	16:00						
明光キッズ:学習	スクール	シニア	月	17:00	880	10450				
明光キッズ:学習	スクール	シニア	金	17:00						
明光キッズ:思考力	スクール	シニア	水	16:00	880	10450				
明光キッズ:思考力	スクール	シニア	水	17:00						
自然科学教室	スクール	シニア	金	16:00	550	8250				
プログラミング	スクール	シニア	木	15:00	1100	8250				
プログラミング	スクール	シニア	木	16:00						
FUNAJUKU	スクール	シニア	火	16:00	0	9350	13750			
FUNAJUKU	スクール	シニア	木	16:00						
EL PIBE	スクール	シニア	月	15:00	0	8250	12650			
EL PIBE	スクール	シニア	金	15:00						
ハンドボール	スクール	シニア	木	16:00	0	8250				
フラグフットボール	スクール	シニア	金	16:00	0	9350				
フラグフットボール	スクール	シニア	金	17:00						
英語フラグフットボール	スクール	シニア	木	16:00	0	11550				
レスリング	スクール	シニア	月	15:00	0	8550	12550	12550	12550	
レスリング	スクール	シニア	火	15:00						
レスリング	スクール	シニア	水	15:00						
レスリング	スクール	シニア	金	15:00						
レスリング	スクール	シニア	土	10:00						
体操アクロバット	スクール	シニア	月	15:00	0	10450	15950			
体操アクロバット	スクール	シニア	木	16:00						
ラグビー	スクール	シニア	月	15:00	0	8250		
サッカー	クラブ	ジュニア	月	15:00	550	8250	11000			
サッカー	クラブ	ジュニア	水	16:00						
器械体操	スクール	ジュニア	火	16:00	550	8250	11000			
器械体操	スクール	ジュニア	水	15:00						
器械体操	スクール	ジュニア	日	10:00						
バスケ	クラブ	ジュニア	月	16:00	550	8250	11000			
バスケ	クラブ	ジュニア	火	15:00						
器械体操	スクール	ジュニア	月	16:00	550	8250	11000			
器械体操	スクール	ジュニア	火	16:00						
器械体操	スクール	ジュニア	木	15:00						
器械体操	スクール	ジュニア	金	15:00						
柔道	クラブ	ジュニア	火	15:00	550	8250	11000	13750	16500	19250
柔道	クラブ	ジュニア	金	15:00						
テニス	クラブ	ジュニア	水	15:00	550	9350	12650			
テニス	クラブ	ジュニア	金	15:00						
野球	クラブ	ジュニア	木	16:00	550	9350	12100			
ボルダリング	クラブ	ジュニア	月	15:00	550	10550	16550	21550		
ボルダリング	クラブ	ジュニア	水	15:00						
ボルダリング	クラブ	ジュニア	木	15:00						
ボルダリング	クラブ	ジュニア	金	16:00						
ボルダリング	クラブ	ジュニア	月	16:00						
ボルダリング	クラブ	ジュニア	金	16:00						
ボルダリング	クラブ	ジュニア	日	10:00						
ダンス	クラブ	ジュニア	月	15:00	550	8250	11000			
ダンス	クラブ	ジュニア	金	16:00						
FUNAJUKU	スクール	ジュニア	火	15:00	0	9350	13750			
FUNAJUKU	スクール	ジュニア	木	15:00						
ハンドボール	スクール	ジュニア	木	16:00	0	8250				
フラグフットボール	スクール	ジュニア	金	15:00	0	9350				
フラグフットボール	スクール	ジュニア	金	16:00						
英語フラグフットボール	スクール	ジュニア	木	15:00	0	11550				
レスリング	スクール	ジュニア	月	15:00	0	8550	12550	12550	12550	
レスリング	スクール	ジュニア	火	15:00						
レスリング	スクール	ジュニア	水	15:00						
レスリング	スクール	ジュニア	金	15:00						
レスリング	スクール	ジュニア	土	10:00						
体操アクロバット	スクール	ジュニア	月	16:00	0	10450	15950			
体操アクロバット	スクール	ジュニア	木	15:00						
英会話:初級	スクール	ジュニア	月	15:00	550	9350	13750	20350		
英会話:初級	スクール	ジュニア	火	15:00						
英会話:初級	スクール	ジュニア	水	15:00						
英会話:初級	スクール	ジュニア	木	15:00						
英会話:初級	スクール	ジュニア	金	15:00						
明光キッズ:学習	スクール	ジュニア	月	15:00	880	10450				
明光キッズ:学習	スクール	ジュニア	金	15:00						
ヴァイオリン	スクール	ジュニア	火	15:00	881	10451				
ヴァイオリン	スクール	ジュニア	水	15:00						
ヴァイオリン	スクール	ジュニア	火	16:00						
ヴァイオリン	スクール	ジュニア	水	16:00
`;

