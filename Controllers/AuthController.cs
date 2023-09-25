using Avaliacao.Helpers;
using Avaliacao.Models;
using Avaliacao.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Avaliacao.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, 
                                IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Authenticate([FromBody] User user)
        {
            User? userResponse = await _userService.GetUserByEmail(user.Email);
            if (userResponse != null)
            {
                if (BCryptHash.verifyHash(user.Password, userResponse.Password))
                {
                    _authService.Login(userResponse);
                    return Ok(new
                    {
                        Token = SystemSession.UserToken,
                        ValidTo = SystemSession.UserTokenValid
                    });
                }
            }

            return BadRequest();
        }
    }
}
