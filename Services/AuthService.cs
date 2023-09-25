using Avaliacao.Helpers;
using Avaliacao.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Avaliacao.Services
{
    public interface IAuthService
    {
        void Login(User user);
    }

    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Login(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var sercret = _configuration["JWT:Secret"];
            var validTo = DateTime.Now.AddHours(2);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Name.ToString()),
                    new Claim(ClaimTypes.Role, user.UserProfile.Name.ToString())
                }),
                NotBefore = DateTime.Now,
                Expires = validTo,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(sercret)), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            SystemSession.UserToken = tokenHandler.WriteToken(token);
            SystemSession.UserID = user.Id;
            SystemSession.UserTokenValid = validTo;
        }

    }
}
