sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"zprovavittorio/model/models"
], function(Controller, Models) {
	"use strict";

	return Controller.extend("zprovavittorio.controller.page2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf zprovavittorio.view.page2
		 */
		onInit: function() {
			var oRouter = this.getOwnerComponent().getRouter();

			oRouter.getRoute("page2").attachMatched(function(oEvent) {
				var oArgs = oEvent.getParameter("arguments");
				var oTabellaRisultati = this.getTabellaRisultati();
				var oDate = new Date(Number(oArgs.data_partenza));
				var sDataPartenza = "";
				var oGiorno = oDate.getDate();
				var oMese = oDate.getMonth();
				
				if(oGiorno < 10){
					sDataPartenza += "0";
				}
				sDataPartenza += oGiorno + "/";
				
				if(oMese < 10){
					sDataPartenza += "0";
				}
				sDataPartenza += oMese + "/";
				
				sDataPartenza += oDate.getFullYear();
				
				var oModelSoluzioni = Models.createSoluzioniModel(oArgs.cod_stazione_partenza, oArgs.cod_stazione_arrivo, sDataPartenza, oArgs.ora_partenza, oArgs.min_partenza);
				oTabellaRisultati.setBusy(true);
				oTabellaRisultati.setModel(oModelSoluzioni, "soluzioni");
				oModelSoluzioni.attachRequestCompleted(oModelSoluzioni, function() {
					oTabellaRisultati.setBusy(false);
				}, this);
			}, this);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf zprovavittorio.view.page2
		 */
		onBeforeRendering: function() {
			// var oTabellaRisultati = this.getTabellaRisultati();
			// var oModelSoluzioni = Models.createSoluzioniModel(oStazionePartenzaSelezionata.cod_stazione, oStazioneArrivoSelezionata.cod_stazione, "16/04/2017", "9", "00")

			// oTabellaRisultati.setBusy(true);
			// oTabellaRisultati.setModel(oModelSoluzioni, "soluzioni");

			// oModelSoluzioni.attachRequestCompleted(oModelSoluzioni, function(){
			// 	oTabellaRisultati.setBusy(false);
			// }, this);

		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf zprovavittorio.view.page2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf zprovavittorio.view.page2
		 */
		//	onExit: function() {
		//
		//	}

		
		
		onPressNavButton: function() {
			window.history.back();
		},

		getTabellaRisultati: function(oController = this) {
			return oController.getView().byId("tabellaRisultati");
		},

	});

});