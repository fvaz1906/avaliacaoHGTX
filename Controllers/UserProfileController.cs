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
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;

        public UserProfileController(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        [HttpGet]
        public async Task<ActionResult> GetUserProfiles() => Ok(await _userProfileService.GetUserProfiles());

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(int id) => Ok(await _userProfileService.GetUserProfileById(id));

        [HttpPost]
        public async Task<ActionResult> PostUser([FromBody] UserProfile userProfile) => Ok(await _userProfileService.PostUserProfile(userProfile));

        [HttpPut]
        public async Task<ActionResult> PutUser([FromBody] UserProfile userProfile) => Ok(await _userProfileService.PutUserProfile(userProfile));

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveUser(int id) => Ok(await _userProfileService.RemoveUserProfile(id));
    }
}