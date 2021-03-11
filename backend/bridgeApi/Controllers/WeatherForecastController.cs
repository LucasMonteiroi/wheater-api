using System.Threading.Tasks;
using bridgeApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace bridgeApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IBridgeApiService _bridgeApiService;

        public WeatherForecastController(IBridgeApiService bridgeApiService)
        {
            _bridgeApiService = bridgeApiService;
        }

        [HttpGet("{address}")]
        public async Task<IActionResult> Get(string address)
        {
            string result = await _bridgeApiService.GetForecastAsync<string>(address);

            return new JsonResult(result);
        }
    }
}
