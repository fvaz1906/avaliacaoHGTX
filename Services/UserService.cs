using Avaliacao.Configuration;
using Avaliacao.Helpers;
using Avaliacao.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Avaliacao.Services
{
    public interface IUserService
    {
        Task<List<User>> GetUsers();
        Task<User?> GetUserById(int id);
        Task<User?> GetUserByEmail(string email);
        Task<User?> PostUser(User user);
        Task<bool> PutUser(User user);
        Task<bool> RemoveUser(int id);
    }

    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetUsers()
        {
            List<User> users = await _context.Users.ToListAsync();
            List<UserProfile> userProfiles = await _context.UserProfiles.ToListAsync();

            foreach (var user in users) 
            { 
                user.UserProfile = userProfiles.Where(x => x.Id == user.ProfileId).FirstOrDefault(); 
            }

            return users;
        }

        public async Task<User?> GetUserById(int id)
        {
            User? user = await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (user != null)
            {
                UserProfile? userProfile = await _context.UserProfiles.FindAsync(user.ProfileId);
                if (userProfile != null)
                {
                    user.UserProfile = userProfile;
                    return user;
                }
            }

            return null;
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            User? user = await _context.Users.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (user != null)
            {
                UserProfile? userProfile = await _context.UserProfiles.FindAsync(user.ProfileId);
                if (userProfile != null)
                {
                    user.UserProfile = userProfile;
                    return user;
                }
            }

            return null;
        }

        public async Task<User?> PostUser(User user)
        {
            try
            {
                user.Password = BCryptHash.generateHash(user);
                user.DateCreate = DateTime.Now;
                user.DateUpdate = DateTime.Now;
                user.Status = true;
                
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                // aqui pode ser usado o Logger para registrar exceções de banco de dados
                throw;
            }
        }

        public async Task<bool> PutUser(User user)
        {
            try
            {
                User userExists = await _context.Users.Where(x => x.Id == user.Id).FirstOrDefaultAsync();
                if (userExists != null)
                {

                    userExists.Name = user.Name;
                    userExists.Email = user.Email;
                    userExists.CPF = user.CPF;
                    userExists.DateBirth = user.DateBirth;
                    userExists.Telephone = user.Telephone;
                    userExists.Cellphone = user.Cellphone;
                    userExists.Password = userExists.Password;
                    userExists.DateUpdate = DateTime.Now;
                    userExists.DateCreate = userExists.DateCreate;
                    userExists.Status = userExists.Status;

                    if (user.Password != null & user.Password != "")
                    {
                        userExists.Password = BCryptHash.generateHash(user);
                    }

                    _context.Users.Update(userExists);
                    await _context.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // aqui pode ser usado o Logger para registrar exceções de banco de dados
                throw;
            }
        }

        public async Task<bool> RemoveUser(int id)
        {
            try
            {
                User userExists = await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
                if (userExists != null)
                {

                    _context.Users.Remove(userExists);
                    await _context.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // aqui pode ser usado o Logger para registrar exceções de banco de dados
                throw;
            }
        }
    }
}
