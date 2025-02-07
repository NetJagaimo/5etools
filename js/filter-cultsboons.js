"use strict";

class PageFilterCultsBoons extends PageFilter {
	constructor () {
		super();

		this._sourceFilter = new SourceFilter();
		this._typeFilter = new Filter({
			header: "Type",
			headerName: "類型",
			items: ["Boon, Demonic", "Cult"],
		});
	}

	static mutateForFilters (it) {
		it._fType = it.__prop === "cult" ? "Cult" : it.type ? `Boon, ${it.type}` : "Boon";
	}

	addToFilters (it, isExcluded) {
		if (isExcluded) return;

		this._sourceFilter.addItem(it.source);
		this._typeFilter.addItem(it._fType);
	}

	async _pPopulateBoxOptions (opts) {
		opts.filters = [
			this._sourceFilter,
			this._typeFilter,
		];
	}

	toDisplay (values, cb) {
		return this._filterBox.toDisplay(
			values,
			cb.source,
			cb._fType,
		)
	}
}
