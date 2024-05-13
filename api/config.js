/* config.js acts as single passthrough from root, so that backend package is self-contained */

var config = require('./monorepo')

require('dotenv').config()

/*
The following is two hard coded users with different permissions, which is intended to simulate how you would use identifying information
from the headers sent in EmbedSDK.init() to lookup a specific user from your database and grant their permissions / user attributes
*/
config.authenticatedUser =
{
  user1: {
    //The external user ID should be a unique value from your system
    "external_user_id": "user1",
    "first_name": "Pat",
    "last_name": "Embed",
    "session_length": 3600,
  "force_logout_login": true,
  // The external_group_id is an arbitrary id, usually from an IdP
  // A folder is created for each external_group_id, for embed users to share content
  "external_group_id": "group1",
  "group_ids": [],
    // For available permissions see: https://docs.looker.com/reference/embedding/sso-embed#permissions
    // If the code here is
    "permissions": [
      // access_data is necessary for every embed user.
    "access_data",
    "can_create_forecast",
    "clear_cache_refresh",
    "create_custom_fields",
    "create_table_calculations",
    "deploy",
    "develop",
    "download_without_limit",
    "explore",
    "manage_spaces",
    "mobile_app_access",
    "save_content",
    "schedule_look_emails",
    "see_drill_overlay",
    "see_lookml",
    "see_lookml_dashboards",
    "see_looks",
    "see_sql",
    "see_user_dashboards",
    "send_to_integration",
    "use_sql_runner"
    ],
    // Models are mandatory; an emebd user can only see content and data using these models
    "models": ["data_block_acs_bigquery", "excel-multisheet-example", "test_project","sales_demo_the_look", "traffic_safety"],
    "user_attributes": { "locale": "en_US" }
  },
  user2: {
    "external_user_id": "user2",
    "first_name": "Jane",
    "last_name": "Doe",
    "session_length": 3600,
  "force_logout_login": true,
  // The external_group_id is an arbitrary id, usually from an IdP
  // A folder is created for each external_group_id, for embed users to share content
  "external_group_id": "group1",
  "group_ids": [],
    //user2 has reduced permissions
    "permissions": [
    "access_data",
    "can_create_forecast",
    "clear_cache_refresh",
    "create_custom_fields",
    "create_table_calculations",
    "deploy",
    "develop",
    "download_without_limit",
    "explore",
    "manage_spaces",
    "mobile_app_access",
    "save_content",
    "schedule_look_emails",
    "see_drill_overlay",
    "see_lookml",
    "see_lookml_dashboards",
    "see_looks",
    "see_sql",
    "see_user_dashboards",
    "send_to_integration",
    "use_sql_runner"
    ],
    "models": ["data_block_acs_bigquery", "excel-multisheet-example", "test_project","sales_demo_the_look", "traffic_safety"],
    //user2 will be localized into a different language
    "user_attributes": { "locale": "es_US" }
  }
}

module.exports = config
