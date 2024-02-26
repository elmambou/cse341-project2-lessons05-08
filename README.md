# cse341-project2-lessons05-08

authorize.js now retrieves the configuration values from environment variables.
app.js retrieves the configuration information from the config module, which in turn reads the values from environment variables.
.env file contains all the sensitive information and configuration variables.
db/config.js is left untouched as it is a separate concern and not directly related to the configuration used in authorize.js or app.js.

