using System;
using System.Threading.Tasks;
using Refit;

namespace bridgeApi.Interfaces
{
    public interface IBridgeApiService
    {
        [Get("/points/{address}/forecast")]
        Task<T> GetForecastAsync<T>(string address);
    }
}