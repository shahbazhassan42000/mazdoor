// import { AppDispatch, RootState } from "~store";
// import { taskAPI } from "~api";
// import {
//   flashActionCreator,
//   loadingIndicatorActions,
//   purchaseOrdersTabActions,
// } from "~reducers";
// import { listingColumnParser, listingRowParser } from "~parsers";

// export const fetchPurchaseOrders = (
//   context: string,
//   taskSequenceNum: number,
//   queryParams?: string
// ) => {
//   return async (dispatch: AppDispatch, getState: () => RootState) => {
//     dispatch(
//       loadingIndicatorActions.showLoadingIndicator({
//         context: context,
//         showBackDrop: true,
//       })
//     );
//     const response = await taskAPI.fetchPurchaseOrderData(
//       taskSequenceNum,
//       queryParams
//     );

//     if (response?.status === 200) {
//       if (response.data?.data) {
//         if (response.data.data.purchase_orders) {
//           dispatch(
//             purchaseOrdersTabActions.setPurchaseOrderRows(
//               listingRowParser.parseListingRows(
//                 response.data.data.purchase_orders
//               )
//             )
//           );
//         }

//         if (response.data.data.purchase_order_cols?.length) {
//           dispatch(
//             purchaseOrdersTabActions.setPurchaseOrderColumns(
//               listingColumnParser.parseListingColumns(
//                 response.data.data.purchase_order_cols
//               )
//             )
//           );
//         } else {
//           dispatch(
//             purchaseOrdersTabActions.setPurchaseOrderColumns(
//               listingColumnParser.parseListingColumns([])
//             )
//           );
//         }

//         if (response.data.data.list_view_preference_id) {
//           dispatch(
//             purchaseOrdersTabActions.setListViewPreferenceId(
//               response.data.data.list_view_preference_id
//             )
//           );
//         }
//         if (response.data.data.can_edit_po_list_view_preference) {
//           dispatch(
//             purchaseOrdersTabActions.setCanEditListViewPreference(
//               response.data.data.can_edit_po_list_view_preference
//             )
//           );
//         }

//         if (response.data.meta) {
//           if (response.data.meta["total-pages"]) {
//             dispatch(
//               purchaseOrdersTabActions.setTotalPages(
//                 response.data.meta["total-pages"]
//               )
//             );
//           }
//           if (response.data.meta["page-entries-info"]) {
//             dispatch(
//               purchaseOrdersTabActions.setPageEntriesInfo(
//                 response.data.meta["page-entries-info"]
//               )
//             );
//           }
//         }
//       }
//     }

//     dispatch(flashActionCreator.handleFlashMessages(response));
//     dispatch(loadingIndicatorActions.hideLoadingIndicator(context));
//   };
// };
