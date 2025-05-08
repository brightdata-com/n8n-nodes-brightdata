import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType
} from 'n8n-workflow';

import { webUnlockerOperations, webUnlockerFields } from './WebUnlockerDescription';
import { marketplaceDatasetOperations, marketplaceDatasetFields } from './MarketplaceDatasetDescription';
import {
	getActiveZones,
	getCountries,
	getDataSets
} from './SearchFunctions';

export class BrightData implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BrightData',
		name: 'brightData',
		icon: 'file:brightdatasquared.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Bright Data to scrape websites or use existing datasets from the marketplace to generate adapted snapshots',
		defaults: {
			name: 'BrightData',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'brightdataApi',
				required: false,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.brightdata.com',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Marketplace Dataset',
						value: 'marketplaceDataset',
					},
					{
						name: 'Web Unlocker',
						value: 'webUnlocker',
					},
				],
				default: 'webUnlocker',
			},
			...webUnlockerOperations,
			...webUnlockerFields,
			...marketplaceDatasetOperations,
			...marketplaceDatasetFields,
		],
	};

	methods = {
		listSearch: {
			getActiveZones: getActiveZones,
			getCountries: getCountries,
			getDataSets: getDataSets
		},
	};
}
