using Avaliacao.Helpers;
using Avaliacao.Models;
using Avaliacao.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Avaliacao.Controllers
{
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsers() => Ok(await _userService.GetUsers());

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(int id) => Ok(await _userService.GetUserById(id));

        [HttpPost]
        public async Task<ActionResult> PostUser([FromBody] User user) => Ok(await _userService.PostUser(user));

        [HttpPut]
        public async Task<ActionResult> PutUser([FromBody] User user) => Ok(await _userService.PutUser(user));

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveUser(int id) => Ok(await _userService.RemoveUser(id));

    }
}
