# TasksApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiOpenapiV1TasksGet**](#apiopenapiv1tasksget) | **GET** /api/openapi/v1/tasks | |
|[**apiOpenapiV1TasksIdDelete**](#apiopenapiv1tasksiddelete) | **DELETE** /api/openapi/v1/tasks/{id} | |
|[**apiOpenapiV1TasksIdGet**](#apiopenapiv1tasksidget) | **GET** /api/openapi/v1/tasks/{id} | |
|[**apiOpenapiV1TasksIdPatch**](#apiopenapiv1tasksidpatch) | **PATCH** /api/openapi/v1/tasks/{id} | |
|[**apiOpenapiV1TasksPost**](#apiopenapiv1taskspost) | **POST** /api/openapi/v1/tasks | |

# **apiOpenapiV1TasksGet**
> Array<TaskResponse> apiOpenapiV1TasksGet()


### Example

```typescript
import {
    TasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let completed: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiOpenapiV1TasksGet(
    completed
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **completed** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**Array<TaskResponse>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiOpenapiV1TasksIdDelete**
> apiOpenapiV1TasksIdDelete()


### Example

```typescript
import {
    TasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiOpenapiV1TasksIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiOpenapiV1TasksIdGet**
> TaskResponse apiOpenapiV1TasksIdGet()


### Example

```typescript
import {
    TasksApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiOpenapiV1TasksIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**TaskResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiOpenapiV1TasksIdPatch**
> apiOpenapiV1TasksIdPatch()


### Example

```typescript
import {
    TasksApi,
    Configuration,
    TaskUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let id: number; // (default to undefined)
let taskUpdateRequest: TaskUpdateRequest; // (optional)

const { status, data } = await apiInstance.apiOpenapiV1TasksIdPatch(
    id,
    taskUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskUpdateRequest** | **TaskUpdateRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiOpenapiV1TasksPost**
> TaskResponse apiOpenapiV1TasksPost()


### Example

```typescript
import {
    TasksApi,
    Configuration,
    TaskCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TasksApi(configuration);

let taskCreateRequest: TaskCreateRequest; // (optional)

const { status, data } = await apiInstance.apiOpenapiV1TasksPost(
    taskCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskCreateRequest** | **TaskCreateRequest**|  | |


### Return type

**TaskResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

