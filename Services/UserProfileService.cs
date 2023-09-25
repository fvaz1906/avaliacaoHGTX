using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Avaliacao.Configuration;
using Avaliacao.Models;
using Microsoft.EntityFrameworkCore;

namespace Avaliacao.Services
{
    public interface IUserProfileService
    {
        Task<List<UserProfile>> GetUserProfiles();
        Task<UserProfile?> GetUserProfileById(int id);
        Task<UserProfile?> PostUserProfile(UserProfile userProfile);
        Task<bool> PutUserProfile(UserProfile userProfile);
        Task<bool> RemoveUserProfile(int id);
    }

    public class UserProfileService : IUserProfileService
    {
        private readonly AppDbContext _context;

        public UserProfileService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserProfile>> GetUserProfiles()
        {
            List<UserProfile> userProfiles = await _context.UserProfiles.ToListAsync();

            return userProfiles;
        }

        public async Task<UserProfile?> GetUserProfileById(int id)
        {
            UserProfile? userProfile = await _context.UserProfiles.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (userProfile != null)
            {
                return userProfile;
            }

            return null;
        }

        public async Task<UserProfile?> PostUserProfile(UserProfile userProfile)
        {
            try
            {
                _context.UserProfiles.Add(userProfile);
                await _context.SaveChangesAsync();
                return userProfile;
            }
            catch (Exception ex)
            {
                // aqui pode ser usado o Logger para registrar exceções de banco de dados
                throw;
            }
        }

        public async Task<bool> PutUserProfile(UserProfile userProfile)
        {
            try
            {
                UserProfile userProfileExists = await _context.UserProfiles.Where(x => x.Id == userProfile.Id).FirstOrDefaultAsync();
                if (userProfileExists != null)
                {
                    userProfileExists.Name = userProfile.Name;
                    userProfileExists.DateUpdate = DateTime.Now;

                    _context.UserProfiles.Update(userProfileExists);
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

        public async Task<bool> RemoveUserProfile(int id)
        {
            try
            {
                UserProfile userProfileExists = await _context.UserProfiles.Where(x => x.Id == id).FirstOrDefaultAsync();
                if (userProfileExists != null)
                {

                    _context.UserProfiles.Remove(userProfileExists);
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