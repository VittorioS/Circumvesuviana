sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"zprovavittorio/model/models"
], function(Controller, Models) {
	"use strict";
	return Controller.extend("zprovavittorio.controller.page1", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf zprovavittorio.view.page1
		 */ // onInit: function() {
		//
		// },
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf zprovavittorio.view.page1
		 */
		onBeforeRendering: function() {
			var oModelStazione = this.getModelStazioni();
			var oInputStazionePartenza = this.getInputStazionePartenza();
			var oInputStazioneArrivo = this.getInputStazioneArrivo();
			oInputStazionePartenza.setBusy(true);
			oInputStazioneArrivo.setBusy(true);
			oModelStazione.attachRequestCompleted(oModelStazione, function() {
				oInputStazionePartenza.setBusy(false);
				oInputStazioneArrivo.setBusy(false);
			}, this);
		},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf zprovavittorio.view.page1
		 */ // onAfterRendering: function() {
		//
		// },
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf zprovavittorio.view.page1
		 */ //	onExit: function() {
		//
		//	}
		/**
		 *@memberOf zprovavittorio.controller.page1
		 */
		onPressButtonCerca: function() {
			//This code was generated by the layout editor.
			var oStazionePartenzaSelezionata = this.getModelStazioneSelezionata().getProperty("/partenza");
			var oStazioneArrivoSelezionata = this.getModelStazioneSelezionata().getProperty("/arrivo");
			var oPickerDataPartenza = this.getPickerDataPartenza();
			var oPickerOraPartenza = this.getPickerOraPartenza();

			var oTime = oPickerOraPartenza.getDateValue();
			var sOraPartenza = "";
			var sMinutiPartenza = "";
			var iOra = oTime.getHours();
			var iMinuti = oTime.getMinutes();
			if (iOra < 10) {
				sOraPartenza += "0";
			}
			sOraPartenza += iOra;
			if (iMinuti < 10) {
				sMinutiPartenza += "0";
			}
			sMinutiPartenza += iMinuti;

			this.getOwnerComponent().getRouter().navTo("page2", {
				cod_stazione_partenza: oStazionePartenzaSelezionata.cod_stazione,
				cod_stazione_arrivo: oStazioneArrivoSelezionata.cod_stazione,
				data_partenza: oPickerDataPartenza.getDateValue().getTime(),
				ora_partenza: sOraPartenza,
				min_partenza: sMinutiPartenza
			});
		},

		onSuggestionItemSelectedPartenza: function(oEvent) {
			this.getModelStazioneSelezionata().setProperty("/partenza", this.getModelStazioni().getProperty(oEvent.getParameter("selectedRow").getBindingContextPath()));
		},
		onSuggestionItemSelectedArrivo: function(oEvent) {
			this.getModelStazioneSelezionata().setProperty("/arrivo", this.getModelStazioni().getProperty(oEvent.getParameter("selectedRow").getBindingContextPath()));
		},

		getInputStazioneArrivo: function(oController = this) {
			return oController.getView().byId("inputStazioneArrivo");
		},

		getInputStazionePartenza: function(oController = this) {
			return oController.getView().byId("inputStazionePartenza");
		},

		getPickerDataPartenza: function(oController = this) {
			return oController.getView().byId("pickerDataPartenza");
		},

		getPickerOraPartenza: function(oController = this) {
			return oController.getView().byId("pickerOraPartenza");
		},

		getModelStazioneSelezionata: function(oController = this) {
			return oController.getView().getModel("stazioneSelezionata");
		},

		getModelStazioni: function(oController = this) {
			return oController.getView().getModel("stazioni");
		}
	});
});