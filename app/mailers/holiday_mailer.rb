class HolidayMailer < ActionMailer::Base

  def holiday_request(user, manager, holiday)
    @holiday = holiday
    @user = user
    @manager = manager
    @holiday = holiday
    @other_users_array = Array.new 
    userAbsence = Absence.find_by_user_id(user.id)
    User.all.each do |u|
      if u.manager_id == @manager.id 
        ab = Absence.find_by_user_id(u.id)
          if userAbsence.date_from <= ab.date_to && ab.date_from <= ab.date_to
            @other_users_array << u unless u.id == user.id
        end
      end
    end
    @url  = "http://example.com/validate_holiday"
    mail(:to      => @manager.email, :from => @user.email,
         :subject => "You have a holiday request awaiting")
  end

   def holiday_amendment(user, manager, holiday)
    @holiday = holiday
    @user = user
    @manager = manager
    @holiday = holiday
    @url  = "http://example.com/validate_holiday"
    mail(:to      => @manager.email, :from => @user.email,
         :subject => "You have a holiday change awaiting")
  end

  #TODO add status for holidays of used - these cannot be changed!!

  def holiday_cancellation(user, manager, holiday)
    @holiday = holiday
    @user = user
    @manager = manager
    mail(:to      => @manager.email, :from => @user.email,
         :subject => "This user has cancelled a holiday")
  end

  def holiday_actioned(manager, holiday)
    @holiday = holiday
    @user = @holiday.user
    @manager = manager
    subject = if holiday.holiday_status_id == 2
                "Your holiday has been accepted"
              elsif holiday.holiday_status_id == 3
                "Your holiday request has been rejected"
              end
    mail(:to      => @user.email, :from => @user.email,
         :subject => subject)
  end

end
