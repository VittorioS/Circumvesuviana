sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {
		
		// sURLAttivita: "http://www.importitconsulting.com/timesheet/backend/attivita.php",

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		// createAttivitaModel: function(){
		// 	const sURL = "http://www.importitconsulting.com/timesheet/backend/attivita.php";
		// 	var oModel = new JSONModel(sURL);
		// 	oModel.setDefaultBindingMode("OneWay");
		// 	oModel.attachRequestCompleted(oModel, function(oEvent) {
		// 		var oData = oModel.getProperty("/");
		// 		var iLength = oData.length;
		// 		var iDelta = 2;
		// 		for(var iIndex = 0; iIndex < iLength - iDelta; iIndex++){
		// 			this.setTipoAttivita(oModel, iIndex, "TestChangeText");
		// 		}
		// 	}, this);
		// 	return oModel; 
		// },
		
		// setTipoAttivita: function(oModel, iIndex, sTipoAttivita){
		// 	oModel.setProperty("/" + iIndex + "/tipo_attivita", sTipoAttivita);
		// }
		
		createStazioneModel: function(){
			const sURL = "http://orari.eavsrl.it/Orari/integrazione5/Orariodinamico/produzione/www/FrontJS/jsonServer.asp?l=it&v=stazioni&r=elencoAliasStazioni&jsoncallback=?&_=1492211397899";
			const iSizeLimit = 9999;
			var oModel = new JSONModel(sURL);
			oModel.setDefaultBindingMode("OneWay");
			oModel.setSizeLimit(iSizeLimit);
			return oModel; 
		},
		
		createSoluzioniModel: function(sIdStazionePartenza, sIdStazioneArrivo, sDataPartenza, sOraPartenza, sMinutiPartenza){
			// const sURL = "http://orari.eavsrl.it/Orari/integrazione5/Orariodinamico/produzione/www/FrontJS/jsonServer.asp?l=it&r=Soluzioni&v=LeSoluzioni&idStazionePartenza=12&idStazioneArrivo=29&dataPartenza=16/04/2017&oraPartenza=9&minPartenza=00&jsoncallback=jsonp1492211396649&_=1492213739674";
			const sURLBase = "http://orari.eavsrl.it/Orari/integrazione5/Orariodinamico/produzione/www/FrontJS/jsonServer.asp?l=it&r=Soluzioni&v=LeSoluzioni&jsoncallback=?&_=1492213739674";
			const sParametroIdStazionePartenza	= "&idStazionePartenza="	+ sIdStazionePartenza;
			const sParametroIdStazioneArrivo	= "&idStazioneArrivo="		+ sIdStazioneArrivo;
			const sParametroDataPartenza		= "&dataPartenza="			+ sDataPartenza;
			const sParametroOraPartenza			= "&oraPartenza="			+ sOraPartenza;
			const sParametroMinutiPartenza		= "&minPartenza="			+ sMinutiPartenza;
			const sURL = sURLBase + sParametroIdStazionePartenza + sParametroIdStazioneArrivo + sParametroDataPartenza + sParametroOraPartenza + sParametroMinutiPartenza;
			const iSizeLimit = 9999;
			var oModel = new JSONModel(sURL);
			oModel.setDefaultBindingMode("OneWay");
			oModel.setSizeLimit(iSizeLimit);
			return oModel; 
		},
		
		createStazioneSelezionataModel: function() {
			var oModel = new JSONModel({});
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		}
		
	};
});