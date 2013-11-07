package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ChotaPerson {
	String name;
	String dob;
	String photo;
	String sex;

	public ChotaPerson(String name, String dob, String photo, String sex) {
		super();
		this.name = name;
		this.dob = dob;
		this.photo = photo;
		this.sex = sex;
	}
	
	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}
}
